from django.urls import path
from . import views

urlpatterns = [
    path('', views.ApiOverview, name='home'),

    # aluno crud endpoints
    path('aluno/create/', views.create_aluno, name='create-aluno'),
    path('aluno/all/', views.view_alunos, name='view_aluno'),
    path('aluno/update/<int:pk>/', views.update_aluno, name='update-aluno'),
    path('aluno/delete/<int:pk>/', views.delete_aluno, name='delete-aluno'),

    # admin crud endpoints
    path('administrador/create/', views.create_administrador,
         name='create-administrador'),
    path('administrador/all/', views.view_administradores,
         name='view_administrador'),
    path('administrador/update/<int:pk>/',
         views.update_administrador, name='update-administrador'),
    path('administrador/delete/<int:pk>/',
         views.delete_administrador, name='delete-administrador'),

    # turma crud endpoints
    path('turma/create/', views.create_turma, name='create-turma'),
    path('turma/all/', views.view_turma, name='view_turma'),
    path('turma/update/<int:pk>/',
         views.update_turma, name='update-turma'),
    path('turma/delete/<int:pk>/',
         views.delete_turma, name='delete-turma'),


]
