from rest_framework import serializers
from .models import BaseUser, User


class BaseUserSerializer(serializers.ModelSerializer):
    pk = serializers.IntegerField(required=False)
    phone = serializers.CharField(required=False)

    class Meta:
        model = BaseUser
        fields = (
            "pk",
            "email",
            "phone",
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
    link = serializers.URLField(required=False)
    activity = serializers.CharField(required=False)

    class Meta:
        model = User
        fields = BaseUserSerializer.Meta.fields + (
            "balance",
            "fio",
            "tg_username",
            "name",
            "link",
            "activity"
        )
        read_only_fields = (
            "balance",
        )


# class AdminSerializer(BaseUserSerializer):
#     class Meta:
#         model = Admin
#         fields = BaseUserSerializer.Meta.fields
#
#
# class ManagerSerializer(BaseUserSerializer):
#     class Meta:
#         model = Manager
#         fields = BaseUserSerializer.Meta.fields
