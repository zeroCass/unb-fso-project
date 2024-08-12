from rest_framework import serializers
from .models import Aluno

class AlunoSerializer(serializers.ModelSerializer):
    # turma = TurmaSerializer(read_only=True) 
    class Meta:
        model = Aluno
        fields = ('id', 'cpf', 'nome', 'turma')
    
