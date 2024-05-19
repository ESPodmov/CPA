from django.db.models.functions import TruncDate
from django.db.models import Count
from authorization.permissions import is_admin_or_manager
from rest_framework import status
from rest_framework.response import Response
from django.utils import timezone


class StatsFilteringMixin:
    cur_model = None

    def list(self, request, *args, **kwargs):

        date_from = request.GET.get("from", None)
        date_to = request.GET.get("to", None)
        partner = request.GET.get("partner", None)

        if not partner:
            return Response({"error": "Partner is not provided"}, status=status.HTTP_400_BAD_REQUEST)

        if not is_admin_or_manager(request) and request.user.pk != int(partner):
            return Response({"error": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)

        if date_from or date_to:
            def get_date_start(cur_date):
                return cur_date.replace(hour=0, minute=0, second=0, microsecond=0)

            if not date_from:
                date_from = timezone.now() - timezone.timedelta(days=1)
                date_from = get_date_start(date_from)
            if not date_to:
                date_to = timezone.now() + timezone.timedelta(days=1)
                date_to = get_date_start(date_to)

            filters = getattr(self, "filters", {})
            queryset = self.cur_model.objects.filter(partner__pk=partner, date__range=(date_from, date_to), **filters)
        elif is_admin_or_manager(request):
            queryset = self.cur_model.objects.filter(partner__pk=partner)
        else:
            return Response({"error": "Date range is not provided"}, status=status.HTTP_400_BAD_REQUEST)

        queryset = queryset.annotate(day=TruncDate('date')).values('day').annotate(count=Count('pk'))
        queryset = self.filter_queryset(queryset)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
