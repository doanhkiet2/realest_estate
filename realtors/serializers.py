from .models import Realtor
from rest_framework import serializers


class RealtorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Realtor
        fields = '__all__'
