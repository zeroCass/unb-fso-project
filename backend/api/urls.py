from django.urls import path

from . import views

urlpatterns = [

    # auth routes
    path('register/', views.AdminRegistrationView.as_view(), name='user-register'), #somente para admins
    path('login/', views.UserLoginView.as_view(), name='user-login'), # login
    path('logout/', views.UserLogoutView.as_view(),  name='user-logout'),

    # CRIACAO DE ALUNOS (somente admins tem essa permissão):
    path('aluno/create/', views.AlunoRegistrationView.as_view(),
         name='aluno-register'),
    path('aluno/all/', views.view_alunos, name='view_aluno'),
    path('aluno/update/<int:pk>/', views.update_aluno, name='update-aluno'),
    path('aluno/delete/<int:pk>/', views.delete_aluno, name='delete-aluno'),

     # details routes
     path('aluno/<int:pk>/', views.view_aluno_details, name='detail-aluno'),
     path('turma/<int:pk>/', views.view_turma_detail, name='detail-turma'),

    # turma crud endpoints
    path('turma/create/', views.create_turma, name='create-turma'),
    path('turma/all/', views.view_turma, name='view_turma'),
    path('turma/update/<int:pk>/',
         views.update_turma, name='update-turma'),
    path('turma/delete/<int:pk>/',
         views.delete_turma, name='delete-turma'),

     # Get current user info:
    path('user/', views.get_user, name='get-user'),

    path('matricula/', views.matricula, name='matricula'),

     # get para geracao de turmas automatica:
     path('gerar-turmas/', views.create_turmas, name='matricula'),

     path('relatorio/', views.TurmaListAPIView.as_view(), name = 'relatorio'),
    

     path('trilhas/', views.get_trilhas, name='get-trilhas')






]
