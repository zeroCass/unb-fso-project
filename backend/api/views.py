from django.shortcuts import render
from rest_framework import generics, viewsets
from rest_framework.permissions import AllowAny

from . import models, serializers


class FooViewSet(viewsets.ModelViewSet):
    queryset = models.Fool.objects.all()
    serializer_class = serializers.FoolSeriealizer

# class CreateFoolView(generics.CreateAPIView):
#     queryset = models.Fool.objects.all()
#     serializer_class = serializers.FoolSeriealizer
#     permission_classes = [AllowAny]

