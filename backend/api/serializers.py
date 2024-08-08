from rest_framework import serializers
from .models import Aluno, Administrador, Turma, Turno, Trilha, NomeTurma


class TurmaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Turma
        fields = ['id', 'nome', 'turno', 'trilha', 'capacidadeMaxima', 'capacidadeAtual']

# Serializer para a classe Aluno
class AlunoSerializer(serializers.ModelSerializer):
    turma = TurmaSerializer(read_only=True) 
    class Meta:
        model = Aluno
        fields = ['id', 'cpf', 'nome', 'turma']



class AdministradorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Administrador
        fields = ['id', 'cpf', 'nome', 'senha']

class TurnoSerializer(serializers.Serializer):
    value = serializers.ChoiceField(choices=Turno.choices)

class TrilhaSerializer(serializers.Serializer):
    value = serializers.ChoiceField(choices=Trilha.choices)

class NomeTurmaSerializer(serializers.Serializer):
    value = serializers.ChoiceField(choices=NomeTurma.choices)
