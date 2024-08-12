from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Aluno, Administrador
from .serializers import AlunoSerializer, AdministradorSerializer
from rest_framework import serializers
from rest_framework import status
from django.shortcuts import get_object_or_404


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
    }

    return Response(api_urls)


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
def create_administrador(request):
    administrador = AdministradorSerializer(data=request.data)
    print('request data:', request.data)
    print(administrador)
    # validating for already existing data
    if Administrador.objects.filter(**request.data).exists():
        print(request.data)
        raise serializers.ValidationError('Um administrador com esse CPF já foi cadastrado ou Os parâmetros enviados estão errados.')

    if administrador.is_valid():
        administrador.save()
        return Response(administrador.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND, data="Um administrador com esse CPF já foi cadastrado ou Os parâmetros enviados estão errados.")
    
# get all administradores
@api_view(['GET'])
def view_administradores(request):
    # checking for the parameters from the URL
    if request.query_params:
        administradores = Administrador.objects.filter(**request.query_params.dict())
    else:
        administradores = Administrador.objects.all()

    # if there is something in administradores else raise error
    if administradores:
        serializer = AdministradorSerializer(administradores, many=True)
        return Response(serializer.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)
# update administrador
@api_view(['PUT'])
def update_administrador(request, pk):
    administrador = Administrador.objects.get(pk=pk)
    data = AdministradorSerializer(instance=administrador, data=request.data)
    if data.is_valid():
        data.save()
        return Response(data.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)
# delete administrador
@api_view(['DELETE'])
def delete_administrador(request, pk):
    administrador = get_object_or_404(Administrador, pk=pk)
    administrador.delete()
    return Response(status=status.HTTP_202_ACCEPTED, data="Admin deletado com sucesso.")

