from stats.mixins import StatsFilteringMixin
from rest_framework.generics import ListAPIView, UpdateAPIView
from .models import Payout
from authorization.permissions import IsAuthorized
from .serializers import PayoutSerializer


class BaseListViewMixin:
    queryset = Payout.objects.all()
    permission_classes = [IsAuthorized]
    serializer_class = PayoutSerializer


class PayoutListView(StatsFilteringMixin, BaseListViewMixin, ListAPIView):
    cur_model = Payout
    filters = {"status": Payout.COMPLETED}


class PayoutUpdateView(UpdateAPIView, BaseListViewMixin):
    pass
