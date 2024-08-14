from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from rest_framework.authtoken.models import Token

class UsuarioManager(BaseUserManager):
    def create_user(self, cpf, nome, role, password=None, **extra_fields):
        if not cpf:
            raise ValueError('O CPF deve ser fornecido')
        user = self.model(cpf=cpf, nome=nome, role=role, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
