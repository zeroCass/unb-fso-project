from django.contrib.auth import authenticate, logout
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, serializers, status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Aluno, NomeTurma, Role, Trilha, Turma, Turno, Usuario
from .serializers import AdminSerializer, AlunoSerializer, TurmaSerializer
from .permissions import IsAdminOrSpecificUser


@api_view(['GET'])
def ApiOverview(request):
    api_urls = {
        'GET ALL Alunos': 'aluno/all/',
        'Add Aluno': '/aluno/create',
        'Update Aluno': '/aluno/update/pk',
        'Delete Aluno': '/aluno/delete/pk',

        'Get All admins': '/admin/all',
        'Add Admin': '/register',
        'Update Admin': '/admin/update/pk',
        'Delete Admin': '/admin/delete/pk',

        'Get All Turma': '/turma/all',
        'Add Turma': '/turma/create',
        'Update Turma': '/turma/update/pk',
        'Delete Turma': '/turma/delete/pk',

        'Get Turnos': '/turnos',
        'Get Trilhas': '/trilhas',
        'Get Nome Turma': '/nomes_turma',
        'Get Roles': '/roles'


    }

    return Response(api_urls)




# Create Admin
class AdminRegistrationView(generics.CreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = AdminSerializer
    permission_classes = [AllowAny]




# Registrar Alunos (Somente Admin (turma=null inicialmente))
class AlunoRegistrationView(APIView):
    permission_classes = [IsAuthenticated]  # Exige que o usuário esteja autenticado

    def post(self, request):
        user = request.user
        print(request.user)
        # Verifica se o usuário tem o papel de ADMIN
        if user.role != 'ADMIN':
            return Response({'error': 'Você não está autorizado a registrar alunos.'}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = AlunoSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# LOGIN E LOGOUT PARA Admin e Alunos

class UserLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        cpf = request.data.get('cpf')
        password = request.data.get('password')
        user = authenticate(username=cpf, password=password)

        if user:
            token, created = Token.objects.get_or_create(user=user)
            response_data = {
                'token': token.key,
                'role': user.role,
                'id': user.id,
                'nome': user.nome
            }

            # Adiciona a turma (id) se o usuário for um aluno
            if user.role == 'ALUNO':
                response_data['turma'] = user.aluno.turma.id if user.aluno.turma else None

            return Response(response_data, status=status.HTTP_202_ACCEPTED)

        else:
            return Response({'error': 'Credenciais inválidas'}, status=status.HTTP_403_FORBIDDEN)

class UserLogoutView(APIView):
    # post request (instead of get)
    def post(self, request):
        request.user.auth_token.delete()
        logout(request)
        content= {"Message": "Usuario deslogado."}
        return Response(status=200, data=content)
    



# Alunos CRUD

# get all aluno
@permission_classes([IsAuthenticated]) # precisa estar autenticado para acessar essa rota
@api_view(['GET']) 
def view_alunos(request):
    user = request.user
    print(request.user)
    # Verifica se o usuário tem o papel de ADMIN
    if user.role != 'ADMIN':
        return Response({'error': 'Você não está autorizado a resgatar todos alunos.'}, status=status.HTTP_403_FORBIDDEN)
    # o uso do try eh para retornar erros internos de banco/sistema (500)
    try:
        # checking for the parameters from the URL
        if request.query_params:
            alunos = Aluno.objects.filter(**request.query_params.dict())
        else:
            alunos = Aluno.objects.all()

         # if there is something in alunos else raise error
        serializer = AlunoSerializer(alunos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(data={{ 'error':f'Erro Interno: {str(e)}',  }},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
# update aluno

# get detail of aluno
@permission_classes([IsAuthenticated]) # precisa estar autenticado para acessar essa rota
@api_view(['GET'])
def view_aluno_details(request, pk):
    try:
        aluno = Aluno.objects.get(pk=pk)
    except Aluno.DoesNotExist:
        return Response({ 'error': 'Aluno não encontrado' }, status=status.HTTP_404_NOT_FOUND)
    
    # verifica permissao para concluir 
    permission = IsAdminOrSpecificUser()
    if not permission.has_object_permission(request, aluno):
        return Response({ 'error': 'Permissao negada' }, status=status.HTTP_403_FORBIDDEN)
    
    serializer = AlunoSerializer(aluno)
    return Response(serializer.data, status=status.HTTP_200_OK)


@permission_classes([IsAuthenticated]) # precisa estar autenticado para acessar essa rota
@api_view(['PUT'])
def update_aluno(request, pk):
    user = request.user
    print(request.user)
    # Verifica se o usuário tem o papel de ADMIN
    if user.role != 'ADMIN' or user.id != pk:
        return Response({'error': 'Você não está autorizado a editar esse aluno.'}, status=status.HTTP_403_FORBIDDEN)
 
    aluno = Aluno.objects.get(pk=pk)
    data = AlunoSerializer(instance=aluno, data=request.data)
    if data.is_valid():
        data.save()
        return Response({{ 'Aluno alterado com sucesso!' }}, data.data, status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)
# delete aluno
@permission_classes([IsAuthenticated]) # precisa estar autenticado para acessar essa rota
@api_view(['DELETE'])
def delete_aluno(request, pk):
    user = request.user
    print(request.user)
    # Verifica se o usuário tem o papel de ADMIN
    if user.role != 'ADMIN':
        return Response({'error': 'Você não está autorizado a deletar esse aluno.'}, status=status.HTTP_403_FORBIDDEN)
 
    aluno = get_object_or_404(Aluno, pk=pk)
    aluno.delete()
    return Response({{ "Aluno deletado com sucesso." }}, status=status.HTTP_202_ACCEPTED)



# TURMA CRUD
# create turma (Somente Administradores podem)
@permission_classes([IsAuthenticated]) # precisa estar autenticado para acessar essa rota
@api_view(['POST'])
def create_turma(request):
    user = request.user
    print(request.user)
    # Verifica se o usuário tem o papel de ADMIN
    if user.role != 'ADMIN':
        return Response({'error': 'Você não está autorizado a registrar Turmas.'}, status=status.HTTP_403_FORBIDDEN)

    turma = TurmaSerializer(data=request.data)
    print('request data:', request.data)
    print(turma)
    # validating for already existing data
    if Turma.objects.filter(**request.data).exists():
        print(request.data)
        raise serializers.ValidationError('Uma turma com esse nome já foi cadastrado ou Os parâmetros enviados estão errados.')

    if turma.is_valid():
        turma.save()
        return Response(turma.data)
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED, data="Uma turma com esse nome já foi cadastrado ou Os parâmetros enviados estão errados.")

# get all turmas
@permission_classes([IsAuthenticated]) # precisa estar autenticado para acessar essa rota (admin e alunos)
@api_view(['GET'])
def view_turma(request):
    try:
        if request.query_params:
            turma = Turma.objects.filter(**request.query_params.dict())
        else:
            turma = Turma.objects.all()
        
        serializer = TurmaSerializer(turma, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({{ 'Erro Interno: ', str(e) }}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# get turma details
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_turma_detail(request, pk):
    try:
        turma = Turma.objects.get(pk=pk)
        serializer = TurmaSerializer(turma)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Turma.DoesNotExist:
        return Response({'error': 'Turma não encontrada.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': f'Internal error: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# UPDATE TURMA
@permission_classes([IsAuthenticated]) # precisa estar autenticado para acessar essa rota (somente admin)
@api_view(['PUT'])
def update_turma(request, pk):
    user = request.user
    print(request.user)
    # Verifica se o usuário tem o papel de ADMIN
    if user.role != 'ADMIN':
        return Response({'error': 'Você não está autorizado a editar turmas.'}, status=status.HTTP_403_FORBIDDEN)
    else: 
        turma = Turma.objects.get(pk=pk)
        data = TurmaSerializer(instance=turma, data=request.data)
        if data.is_valid():
            data.save()
            return Response(data.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
# delete turma
@permission_classes([IsAuthenticated]) # precisa estar autenticado para acessar essa rota (somente admin)
@api_view(['DELETE'])
def delete_turma(request, pk):
    user = request.user
    print(request.user)
    # Verifica se o usuário tem o papel de ADMIN
    if user.role != 'ADMIN':
        return Response({'error': 'Você não está autorizado a registrar alunos.'}, status=status.HTTP_403_FORBIDDEN)

    turma = get_object_or_404(Turma, pk=pk)
    turma.delete()
    return Response(status=status.HTTP_202_ACCEPTED, data="Turma deletada com sucesso.")



# get Turnos (sem autenticacao)
@api_view(['GET'])
def get_turnos(request):
    turno_dict = {key: label for key, label in Turno.choices}
    return Response(data=turno_dict)

#get nome das turmas (sem autenticacao)
@api_view(['GET'])
def get_nome_turma(request):
    nome_turma_dict = {key: label for key, label in NomeTurma.choices}
    return Response(data=nome_turma_dict)

# get trilhas (sem autenticacao)
@api_view(['GET'])
def get_trilhas(request):
    trilha_dict = {key: label for key, label in Trilha.choices}
    return Response(data=trilha_dict)

#get roles (sem autenticacao)
@api_view(['GET'])
def get_roles(request):
    role_dict = {key: label for key, label in Role.choices}
    return Response(data=role_dict)

@permission_classes([IsAuthenticated]) # precisa estar autenticado para acessar essa rota 
@api_view(['GET'])
def get_user(request):
    user = request.user
    if user:
            response_data = {
                'id': user.id,
                'cpf': user.cpf,
                'role': user.role,
                'nome': user.nome
            }

            # Adiciona a turma (id) se o usuário for um aluno
            if user.role == 'ALUNO':
                response_data['turma'] = user.aluno.turma.id if user.aluno.turma else None

            return Response(response_data, status=status.HTTP_200_OK)
    else:
        return Response({{ 'Erro ao pegar usuario' }}, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated]) # precisa estar autenticado para acessar essa rota 
@api_view(['POST'])
def matricula(request):
    user = request.user
    turma_id = request.data['turma']
    # Verifica se o usuário tem o papel de ADMIN
    if user.role == 'ADMIN':
        return Response({'error': 'Você não está autorizado fazer matricula.'}, status=status.HTTP_403_FORBIDDEN)
    else:
        return user.aluno.matricula(turma_id)