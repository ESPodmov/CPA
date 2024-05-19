from rest_framework.generics import ListAPIView, GenericAPIView, CreateAPIView
from rest_framework.response import Response
from rest_framework import status

from authorization.models import User
from authorization.permissions import IsAuthorized

from .serializers import ClickSerializer, ConversionSerializer
from .models import Click, Conversion

from offers.decorators import token_required

from payouts.models import Payout

from .mixins import StatsFilteringMixin


class ClickListView(ListAPIView, StatsFilteringMixin):
    queryset = Click.objects.all()
    serializer_class = ClickSerializer
    permission_classes = [IsAuthorized]
    cur_model = Click


class ConversionBaseView(GenericAPIView):
    queryset = Conversion.objects.all()
    serializer_class = ConversionSerializer


class ConversionListView(ListAPIView, ConversionBaseView, StatsFilteringMixin):
    cur_model = Conversion
    permission_classes = [IsAuthorized]


class ConversionCreateView(CreateAPIView, ConversionBaseView):
    @token_required
    def create(self, request, change_token=False, *args, **kwargs):
        click_pk = request.POST.get("utm_data", None)
        user_pk = request.POST.get("utm_campaign", None)
        reward = request.POST.get("reward", None)

        if not user_pk or not click_pk or not reward:
            return Response({"error": "Incomplete data provided"}, status=status.HTTP_400_BAD_REQUEST)

        click = Click.objects.get(pk=click_pk)
        user = User.objects.get(pk=user_pk)

        if not click or not user:
            return Response({"error": "Internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        conversion = Conversion.objects.create(click=click, user=user, offer=click.offer)
        payout = Payout.objects.create(conversion=conversion, user=user, amount=reward)
        serializer = self.get_serializer()
        serializer = serializer(conversion)
        response_data = {"data": serializer.data}
        if "new_secret_token" in kwargs:
            response_data["token"] = kwargs["new_secret_token"]
        return Response(response_data, status=status.HTTP_201_CREATED)
