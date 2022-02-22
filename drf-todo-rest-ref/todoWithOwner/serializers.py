from rest_framework import serializers 
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from .models import TodoWithOwner


class TodoWithOwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoWithOwner
        fields = ['id', 'text','owner']
        extra_kwargs = {'owner': {'read_only': True}}
        