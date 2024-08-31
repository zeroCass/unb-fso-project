from rest_framework import serializers
from .models import Usuario, Aluno, Turma

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['cpf', 'nome', 'role', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = Usuario.objects.create_user(
            cpf=validated_data['cpf'],
            nome=validated_data['nome'],
            role=validated_data['role'],
            password=validated_data['password']
        )
        return user
    

class AlunoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aluno
        fields = ['cpf', 'nome', 'role', 'password', 'turma']
        extra_kwargs = {
            'password': {'write_only': True},
            'turma': {'default': None},  # Define turma como None por padrão
        }

    def create(self, validated_data):
        validated_data['turma'] = None  # Inicializa turma como null
        aluno = Aluno.objects.create_user(
            cpf=validated_data['cpf'],
            nome=validated_data['nome'],
            role=validated_data['role'],
            password=validated_data['password'],
            turma=validated_data['turma'],
        )
        return aluno
    

class TurmaSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Turma
        fields = "__all__"
    

