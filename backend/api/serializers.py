from rest_framework import serializers
from .models import Aluno, Usuario, Turma


class TurmaSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Turma
        fields = ('id', 'nome', 'turno', 'trilha', 'capacidadeMaxima', 'capacidadeAtual')
    



class AlunoSerializer(serializers.ModelSerializer):
    turma = TurmaSerializer(read_only=True) 
    class Meta:
        model = Aluno
        fields = ('id', 'cpf', 'nome', 'turma', 'role')
    
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = Usuario
        fields = ('cpf', 'nome', 'password')