from django.db import models


# Create your models here.
class Fool(models.Model):
    cpf = models.CharField(default="", unique=True, max_length=11)
    name = models.CharField(max_length=100, default="")