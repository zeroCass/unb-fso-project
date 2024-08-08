from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils.translation import gettext_lazy as _

from abc import abstractmethod


# Turno, Trilha e Nome da Turma são Enums:
# Utilizando Enums e TextChoices por serem ideais para criar campos de escolha, podendo ser alterados facilmente
# ao se adicionar ou remover turnos, trilhas ou turmas.


class Turno(models.TextChoices):
    MATUTINO = 'MAT', _('Matutino')
    VESPERTINO = 'VES', _('Vespertino')

# Enum para as trilhas (apenas como exemplo)


class Trilha(models.TextChoices):

    ENEGRESER = 1, _('ENEGRE-SER')
    DNMEV = 2, _('DINHEIRO NA MÃO É VENDAVAL')
    AMN = 3, _('ADMIRÁVEL MUNDO NOVO')


# Enum para as turmas
class NomeTurma(models.TextChoices):
    A = 1,  _('A')
    B = 2,  _('B')
    C = 3,  _('C')
    D = 4, _('D')
    E = 5, _('E')
    F = 6, _('F')
    G = 7, _('G')
    H = 8, _('H')


# Classe Usuário (Abstrata) - Possui CPF e Nome

class Usuario(AbstractBaseUser):
    cpf = models.CharField(max_length=11, unique=True)
    nome = models.CharField(max_length=255)

    USERNAME_FIELD = 'cpf'
    REQUIRED_FIELDS = ['nome']

    class Meta:
        abstract = True

    @abstractmethod  # login para aluno e admin são diferentes
    def login(self):
        pass

# Classe Aluno (Herda de Usuário)


class Aluno(Usuario):
    turma = models.ForeignKey(
        'Turma', on_delete=models.SET_NULL, null=True, blank=True)

    def login(self, cpf):
        if cpf == self.cpf:
            return True
        return False

    def escolherTurno(self, turno):
        pass

    def escolherTrilha(self, trilha):
        pass

    def realizarMatricula(self):
        pass

    def visualizarMatricula(self):
        pass


# Classe Administrador (Herda de Usuário)
class Administrador(Usuario):
    senha = models.CharField(max_length=128)

    def login(self, cpf, senha):
        if (cpf == self.cpf) and (senha == self.senha):
            return True
        return False

    def cadastrarAlunos(self, alunos):
        # Lógica para cadastrar alunos
        pass

    def consultarRelatório(self):
        # Lógica para consultar relatórios
        pass

# Classe Turma


class Turma(models.Model):
    nome = models.CharField(
        max_length=1, choices=NomeTurma.choices, unique=True)
    turno = models.CharField(max_length=3, choices=Turno.choices)
    trilha = models.CharField(max_length=3, choices=Trilha.choices)
    capacidadeMaxima = models.PositiveIntegerField()
    capacidadeAtual = models.PositiveIntegerField(default=0)

    def verificarVagas(self):
        return self.capacidadeAtual < self.capacidadeMaxima

    def reservarVagas(self, quantidade):
        if self.verificarVagas() and self.capacidadeAtual + quantidade <= self.capacidadeMaxima:
            self.capacidadeAtual += quantidade
            self.save()
            return True
        return False

    def atualizarCapacidade(self, nova_capacidade):
        if nova_capacidade >= self.capacidadeAtual:
            self.capacidadeMaxima = nova_capacidade
            self.save()
            return True
        return False
