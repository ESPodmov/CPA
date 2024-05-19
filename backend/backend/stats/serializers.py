from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from .models import Click, Conversion
from authorization.models import User
from offers.models import Offer


class ClickSerializer(ModelSerializer):
    user = PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Click
        fields = (
            "pk",
            "offer",
            "ip_address",
            "date",
            "user"
        )
        read_only_fields = (
            "pk",
        )


class ConversionSerializer(ModelSerializer):
    user = PrimaryKeyRelatedField(queryset=User.objects.all())
    offer = PrimaryKeyRelatedField(queryset=Offer.objects.all())
    click = PrimaryKeyRelatedField(queryset=Click.objects.all())

    class Meta:
        model = Conversion
        fields = (
            "pk",
            "click",
            "offer",
            "date",
            "user"
        )
        read_only_fields = (
            "pk",
        )
