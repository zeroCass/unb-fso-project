from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils.translation import gettext_lazy as _
from rest_framework.response import Response

from .managers import UsuarioManager


class Role(models.TextChoices):
    ADMIN = 'ADMIN', _('Administrador')
    ALUNO = 'ALUNO', _('Aluno')


class Turno(models.TextChoices):
    MATUTINO = 'MAT', _('Matutino')
    VESPERTINO = 'VES', _('Vespertino')


class Trilha(models.TextChoices):
    ENEGRESER = 'ENEGRESER', _('ENEGRE-SER')
    DNMEV = 'DNMEV', _('DINHEIRO NA MÃO É VENDAVAL')
    AMN = 'AMN', _('ADMIRÁVEL MUNDO NOVO')
    AGRO = 'AGRO', _('AGROECOLOGIA')


class NomeTurma(models.TextChoices):
    A = 'A', _('A')
    B = 'B', _('B')
    C = 'C', _('C')
    D = 'D', _('D')
    E = 'E', _('E')
    F = 'F', _('F')
    G = 'G', _('G')
    H = 'H', _('H')


# user base class
class Usuario(AbstractBaseUser, PermissionsMixin):
    cpf = models.CharField(max_length=11, unique=True)
    nome = models.CharField(max_length=255)
    role = models.CharField(
        max_length=255, choices=Role.choices, default='ALUNO')

    USERNAME_FIELD = 'cpf'
    REQUIRED_FIELDS = ['nome', 'role']

    objects = UsuarioManager()

    def __str__(self):
        return f"{self.nome} ({self.cpf}) - {self.role}"


class Aluno(Usuario):
    turma = models.ForeignKey(
        'Turma', on_delete=models.SET_NULL, null=True, blank=True)

    def matricula(self, turma_id):  # matricula o aluno baseado na turma
        if (self.turma):  # checa se aluno ja esta matriculado
            turma = Turma.objects.get(id=turma_id)
            return Response(data={"error": "Aluno já está matriculado na turma: " + str(turma.nome) +
                                  " do Turno: " + str(turma.turno)}, status=200)

        try:
            # Tenta encontrar a turma com o ID fornecido
            turma = Turma.objects.get(id=turma_id)
            if (turma.capacidadeAtual > 0):
                turma.atualizarCapacidade()
                self.turma = turma
                self.save()
                return Response(data={"message": "Aluno Matriculado na Turma "+str(turma.nome) +
                                      " do Ano: " + str(turma.ano)}, status=200)
            else:
                return Response(data={"error": "Turma está cheia."}, status=200)

        except Turma.DoesNotExist:
            # Turma nao foi enconnrada
            return Response(data={"error": "Turma não encontrada"}, status=200)


class Turma(models.Model):
    nome = models.CharField(
        max_length=1, choices=NomeTurma.choices, unique=True)
    turno = models.CharField(max_length=3, choices=Turno.choices)
    trilha = models.CharField(max_length=255, choices=Trilha.choices)
    ano = models.PositiveIntegerField(default=1)
    capacidadeMaxima = models.PositiveIntegerField(default=30)
    capacidadeAtual = models.PositiveIntegerField(default=30)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['nome', 'ano'], name='unique_nome_ano')
        ]

    def verificarVagas(self):
        pass

    def reservarVagas(self, quantidade):
        pass

    def atualizarCapacidade(self):
        self.capacidadeAtual -= 1
        self.save()
    def getAll(self):
        queryset = self._meta.model.objects.all()
        # can use the below method also
        # queryset = self.__class__.objects.all()   
        return queryset
