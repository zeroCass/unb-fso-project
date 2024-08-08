from rest_framework import viewsets
from .models import Aluno, Administrador, Turma
from .serializers import AlunoSerializer, AdministradorSerializer, TurmaSerializer

# ViewSet para Aluno
class AlunoViewSet(viewsets.ModelViewSet):
    queryset = Aluno.objects.all()
    serializer_class = AlunoSerializer

# ViewSet para Administrador
class AdministradorViewSet(viewsets.ModelViewSet):
    queryset = Administrador.objects.all()
    serializer_class = AdministradorSerializer

# ViewSet para Turma
class TurmaViewSet(viewsets.ModelViewSet):
    queryset = Turma.objects.all()
    serializer_class = TurmaSerializer