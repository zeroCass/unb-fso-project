from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Aluno, Turma, Turno, Trilha, NomeTurma, Role
from .serializers import AlunoSerializer, TurmaSerializer
from rest_framework import serializers
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated  # <-- Here



@api_view(['GET'])
def ApiOverview(request):
    api_urls = {
        'GET ALL Alunos': 'aluno/all/',
        'Add Aluno': '/aluno/create',
        'Update Aluno': '/aluno/update/pk',
        'Delete Aluno': '/aluno/delete/pk',

        'Get All admins': '/admin/all',
        'Add Admin': '/admin/create',
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


# teste para autenticação:

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def teste(request):
    data = {"message": "Você está autenticado!"}
    return Response(data)

# ALUNO CRUD:
# create aluno
@api_view(['POST'])
def create_aluno(request):
    aluno = AlunoSerializer(data=request.data)
    print('request data:', request.data)
    print(aluno)
    # validating for already existing data
    if Aluno.objects.filter(**request.data).exists():
        print(request.data)
        raise serializers.ValidationError('Um aluno com esse CPF já foi cadastrado ou Os parâmetros enviados estão errados.')

    if aluno.is_valid():
        aluno.save()
        return Response(aluno.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND, data="Um aluno com esse CPF já foi cadastrado ou Os parâmetros enviados estão errados.")
# get all aluno
@api_view(['GET'])
def view_alunos(request):
    # checking for the parameters from the URL
    if request.query_params:
        alunos = Aluno.objects.filter(**request.query_params.dict())
    else:
        alunos = Aluno.objects.all()

    # if there is something in alunos else raise error
    if alunos:
        serializer = AlunoSerializer(alunos, many=True)
        return Response(serializer.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)
# update aluno
@api_view(['PUT'])
def update_aluno(request, pk):
    aluno = Aluno.objects.get(pk=pk)
    data = AlunoSerializer(instance=aluno, data=request.data)
    if data.is_valid():
        data.save()
        return Response(data.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)
# delete aluno
@api_view(['DELETE'])
def delete_aluno(request, pk):
    aluno = get_object_or_404(Aluno, pk=pk)
    aluno.delete()
    return Response(status=status.HTTP_202_ACCEPTED, data="Aluno deletado com sucesso.")


# ADMIN CRUD (to be changed )
# create admin
@api_view(['POST'])
def create_user(request):
    pass
# get all administradores

# update administrador
@api_view(['PUT'])
def update_administrador(request, pk):
    pass# delete administrador
@api_view(['DELETE'])
def delete_administrador(request, pk):
    pass
# TURMA CRUD
# create turma
@api_view(['POST'])
def create_turma(request):
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
        return Response(status=status.HTTP_404_NOT_FOUND, data="Uma turma com esse nome já foi cadastrado ou Os parâmetros enviados estão errados.")
# get all turmas
@api_view(['GET'])
def view_turma(request):
    # checking for the parameters from the URL
    if request.query_params:
        turma = Turma.objects.filter(**request.query_params.dict())
    else:
        turma = Turma.objects.all()

    # if there is something in turma else raise error
    if turma:
        serializer = TurmaSerializer(turma, many=True)
        return Response(serializer.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND, data="Nenhuma turma cadastrada.")
# UPDATE TURMA
@api_view(['PUT'])
def update_turma(request, pk):
    turma = Turma.objects.get(pk=pk)
    data = TurmaSerializer(instance=turma, data=request.data)
    if data.is_valid():
        data.save()
        return Response(data.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)
# delete turma
@api_view(['DELETE'])
def delete_turma(request, pk):
    turma = get_object_or_404(Turma, pk=pk)
    turma.delete()
    return Response(status=status.HTTP_202_ACCEPTED, data="Turma deletado com sucesso.")



# get Turnos
@api_view(['GET'])
def get_turnos(request):
    turno_dict = {key: label for key, label in Turno.choices}
    return Response(data=turno_dict)
#get nome das turmas
@api_view(['GET'])
def get_nome_turma(request):
    nome_turma_dict = {key: label for key, label in NomeTurma.choices}
    return Response(data=nome_turma_dict)
# get trilhas
@api_view(['GET'])
def get_trilhas(request):
    trilha_dict = {key: label for key, label in Trilha.choices}
    return Response(data=trilha_dict)

#get roles
@api_view(['GET'])
def get_roles(request):
    role_dict = {key: label for key, label in Role.choices}
    return Response(data=role_dict)

