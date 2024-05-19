from rest_framework.serializers import ModelSerializer, ListSerializer, PrimaryKeyRelatedField
from .models import News
from authorization.models import BaseUser


class NewsShortSerializer(ModelSerializer):
    class Meta:
        model = News
        fields = (
            'title',
            'body',
            'created_at',
        )


class NewsShortListSerializer(ListSerializer):
    child = NewsShortSerializer()


class NewsSerializer(ModelSerializer):
    creator = PrimaryKeyRelatedField(queryset=BaseUser.objects.all())

    class Meta:
        model = News
        fields = (
            "pk",
            "title",
            "body",
            "creator",
            "created_at",
            "edited_at",
            "is_published"
        )
        read_only_fields = (
            "pk",
            "created_at",
            "edited_at",
        )


class NewsListSerializer(ListSerializer):
    child = NewsSerializer()
