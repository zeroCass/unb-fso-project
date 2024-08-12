from django.urls import path
from . import views
 
urlpatterns = [
    path('', views.ApiOverview, name='home'),
     path('aluno/create/', views.create_aluno, name='create-aluno'),
     path('aluno/all/', views.view_alunos, name='view_aluno'),
     path('aluno/update/<int:pk>/', views.update_aluno, name='update-aluno'),
     path('aluno/delete/<int:pk>/', views.delete_aluno, name='delete-aluno'),
]