from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from .models import Payout
from stats.models import Conversion
from authorization.models import User


class PayoutSerializer(ModelSerializer):
    conversion = PrimaryKeyRelatedField(queryset=Conversion.objects.all())
    user = PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Payout
        fields = (
            "pk",
            "conversion",
            "amount",
            "date",
            "user",
            "status"
        )
        read_only_fields = (
            "pk",
            "conversion",
            "amount",
            "date",
            "user",
        )
