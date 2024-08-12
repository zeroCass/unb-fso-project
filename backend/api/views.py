from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Aluno
from .serializers import AlunoSerializer
from rest_framework import serializers
from rest_framework import status
from django.shortcuts import get_object_or_404

 
 
@api_view(['GET'])
def ApiOverview(request):
    api_urls = {
        'GET ALL Alunos': 'aluno/all/',
        'Add Aluno': '/aluno/create',
        'Update Aluno': '/aluno/update/pk',
        'Delete': '/aluno/delete/pk'
    }
 
    return Response(api_urls)


# create aluno
@api_view(['POST'])
def create_aluno(request):
    aluno = AlunoSerializer(data=request.data)
    print('request data:', request.data)
    print(aluno)
    # validating for already existing data
    if Aluno.objects.filter(**request.data).exists():
        print(request.data)
        raise serializers.ValidationError('This data already exists')
 
    if aluno.is_valid():
        aluno.save()
        return Response(aluno.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)
    

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


#update aluno  
@api_view(['PUT'])
def update_aluno(request, pk):

    print("pk: ", pk)
    aluno = Aluno.objects.get(pk=pk)
    print("aluno: ", aluno)
    data = AlunoSerializer(instance=aluno, data=request.data)

    # missing parameters treatment
    if('nome' not in request.data):
        request.data['nome'] = aluno.nome 
    if('cpf' not in request.data):
        request.data['cpf'] = aluno.cpf 


    if data.is_valid():
        data.save()
        return Response(data.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

#delete aluno
@api_view(['DELETE'])
def delete_aluno(request, pk):
    aluno = get_object_or_404(Aluno, pk=pk)
    aluno.delete()
    return Response(status=status.HTTP_202_ACCEPTED, data="Aluno deletado com sucesso.")