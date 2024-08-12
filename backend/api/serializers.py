from rest_framework import serializers
from .models import Aluno, Administrador

class AlunoSerializer(serializers.ModelSerializer):
    # turma = TurmaSerializer(read_only=True) 
    class Meta:
        model = Aluno
        fields = ('id', 'cpf', 'nome', 'turma')
    
class AdministradorSerializer(serializers.ModelSerializer):
    # turma = TurmaSerializer(read_only=True) 
    class Meta:
        model = Administrador
        fields = ('id', 'cpf', 'nome', 'senha')
    

