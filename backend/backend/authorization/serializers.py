from rest_framework import serializers
from .models import BaseUser, User, Admin, Manager


class BaseUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = BaseUser
        fields = (
            "pk",
            "username",
            "email",
            "phone"
        )
        read_only_fields = (
            "pk",
        )

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class UserSerializer(BaseUserSerializer):
    class Meta:
        model = BaseUser
        fields = BaseUserSerializer.Meta.fields + ("balance",)


class AdminSerializer(BaseUserSerializer):
    class Meta:
        model = Admin
        fields = BaseUserSerializer.Meta.fields


class ManagerSerializer(BaseUserSerializer):
    class Meta:
        model = Manager
        fields = BaseUserSerializer.Meta.fields
