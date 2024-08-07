from rest_framework import serializers

from . import models


class FoolSeriealizer(serializers.ModelSerializer):
    class Meta:
        model = models.Fool
        fields = ["id", "cpf", "name"]