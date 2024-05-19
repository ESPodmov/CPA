from rest_framework import serializers
from .models import BaseUser, User, Admin, Manager


class BaseUserSerializer(serializers.ModelSerializer):
    phone = serializers.CharField(required=False)

    class Meta:
        model = BaseUser
        fields = (
            "pk",
            "username",
            "email",
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
    fio = serializers.CharField(required=False)
    tg_username = serializers.CharField(required=False)
    name = serializers.CharField(required=False)

    class Meta:
        model = BaseUser
        fields = BaseUserSerializer.Meta.fields + (
            "balance",
            "fio",
            "tg_username",
            "name",
        )
        read_only_fields = (
            "balance",
        )


class AdminSerializer(BaseUserSerializer):
    class Meta:
        model = Admin
        fields = BaseUserSerializer.Meta.fields


class ManagerSerializer(BaseUserSerializer):
    class Meta:
        model = Manager
        fields = BaseUserSerializer.Meta.fields
