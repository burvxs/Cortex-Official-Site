from rest_framework import serializers
from .models import UserAccount

class AccountSerialiser(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ('email', 'full_name', 'password', 'password_confirm', 'active', 'timestamp',)