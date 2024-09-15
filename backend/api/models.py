from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils.translation import gettext_lazy as _
from rest_framework.response import Response
from django.db import transaction
from django.utils import timezone
from datetime import timedelta

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


class NumeroRequisicoes(models.Model):
    """Tabela no BD para gerenciar o número de requisicoes permitidas ao realizar uma matricula ou reservar um turno"""
    turno = models.CharField(max_length=3, unique=True, choices=Turno.choices) 
    valor = models.IntegerField() # valor correspondende ao numero de requisicoes

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

    def matricula(self, turma_id):
        """Algoritmo para concorrencia de matricula: 
      
                1 - Quando um aluno autorizado a ser matriculado confirma sua matricula, é checado se esse aluno está na fila 
                e verificado com o timestamp se não se passaram 30 segundos, se passar mais de 30 segundos ou o aluno não estiver 
                na fila a matricula nao é realizada (e o aluno é deletado da fila), caso contrário a matrícula é realizada
                atomicamente e o aluno também é deletado da fila. 
                2 - Se o número novo de vagas restantes for menor do que o número de requisicoes permitidas, esse valor é alterado
                para esse novo valor, se o valor novo for 0, o número é alterado para a outra turma com menor número de vagas."""
    # Checa se aluno já está matriculado
        if self.turma:
            turma = Turma.objects.get(id=turma_id)
            return Response(data={"error": "Aluno já está matriculado na turma: " + str(turma.nome) +
                                        " do Turno: " + str(turma.turno)}, status=200)

        # Inicia uma transação atômica
        with transaction.atomic():
            # Verifica se o aluno está na fila de espera
            try:
                aluno_reservado = AlunosReservados.objects.select_for_update().get(aluno=self)

                # Calcula o tempo atual e o limite de 30 segundos
                tempo_atual = timezone.now()
                print(dir(aluno_reservado))
                limite_tempo = aluno_reservado.tempo_inicial + timedelta(seconds=31)

                # Verifica se o aluno ainda está dentro do limite de tempo
                if tempo_atual > limite_tempo:
                    # Se passou do tempo, remove o aluno da fila e impede matrícula
                    aluno_reservado.delete()
                    return Response(data={"error": "Tempo de reserva expirado. Matrícula não realizada."}, status=200)
            except AlunosReservados.DoesNotExist:
                return Response(data={"error": "Aluno não está autorizado para matrícula."}, status=200)

            try:
                # Tenta encontrar a turma com o ID fornecido
                turma = Turma.objects.select_for_update().get(id=turma_id)

                # Checa se ainda há capacidade na turma
                if turma.capacidadeAtual > 0:
                    # Atualiza a capacidade da turma
                    turma.atualizarCapacidade()

                    # Matricula o aluno
                    self.turma = turma
                    self.save()

                    # Remove o aluno da fila após matrícula bem-sucedida
                    aluno_reservado.delete()

                # Ajusta o valor de NumeroRequisicoes com base nas vagas restantes
                requisicoes_turno = NumeroRequisicoes.objects.select_for_update().get(turno=turma.turno)
                
                # Se as vagas restantes forem menores que o valor de requisições permitidas
                if turma.capacidadeAtual < requisicoes_turno.valor:
                    requisicoes_turno.valor = turma.capacidadeAtual
                    requisicoes_turno.save()

                # Se a turma não tem mais vagas, ajusta para a turma com menos vagas
                if turma.capacidadeAtual == 0:
                    menor_turma = Turma.objects.filter(capacidadeAtual__gt=0).order_by('capacidadeAtual').first()
                    if menor_turma:
                        requisicoes_turno.valor = menor_turma.capacidadeAtual
                        requisicoes_turno.save()
                    return Response(data={"message": "Aluno matriculado na turma " + str(turma.nome) +
                                                " do Ano: " + str(turma.ano)}, status=200)
                else:
                    return Response(data={"error": "Turma está cheia."}, status=200)

            except Turma.DoesNotExist:
                return Response(data={"error": "Turma não encontrada."}, status=200)


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
        with transaction.atomic():
            self.capacidadeAtual -= 1
            self.save()
    def getAll(self):
        queryset = self._meta.model.objects.all()
        # can use the below method also
        # queryset = self.__class__.objects.all()   
        return queryset


class AlunosReservados(models.Model):
    aluno = models.ForeignKey(
        'Aluno', on_delete=models.CASCADE)
    tempo_inicial = models.DateTimeField(auto_now_add=True) # sempre salva com o momento inicial da requisicao
    turno = models.CharField(max_length=3, choices=Turno.choices)
