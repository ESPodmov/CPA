from django.db.models.functions import TruncDate, Coalesce
from django.db.models import Count
from authorization.permissions import is_admin_or_manager
from rest_framework import status
from rest_framework.response import Response
from django.utils import timezone
from datetime import datetime, timedelta
from django.utils.dateparse import parse_datetime
from .serializers import StatsSerializer


class StatsFilteringMixin:
    cur_model = None

    # serializer_class = StatsSerializer

    def list(self, request, *args, **kwargs):

        date_from = request.GET.get("from", None)
        date_to = request.GET.get("to", None)
        partner = request.GET.get("partner", None)
        fields = None

        if not partner:
            partner = request.user.pk if request.user.is_authenticated else 0
            if not partner:
                return Response({"error": "Partner is not provided"}, status=status.HTTP_400_BAD_REQUEST)

        if not is_admin_or_manager(request) and request.user.pk != int(partner):
            return Response({"error": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)

        # try:
        #     if date_from:
        #         date_from = datetime.fromisoformat(date_from)
        #     if date_to:
        #         date_to = datetime.fromisoformat(date_to)
        # except ValueError:
        #     return Response({"error": "Invalid date format"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = None

        if date_from or date_to:
            moscow_offset = timezone.timedelta(hours=3)  # UTC+3
            moscow_tz = timezone.get_fixed_timezone(moscow_offset)

            date_from = parse_datetime(date_from)
            date_to = parse_datetime(date_to)

            if not date_from or not date_to:
                return Response({"error": "Invalid date format"}, status=status.HTTP_400_BAD_REQUEST)

            def get_date_start(cur_date):
                return cur_date.replace(hour=0, minute=0, second=0, microsecond=0)

            if not date_from:
                date_from = timezone.now() - timezone.timedelta(days=1)
                date_from = get_date_start(date_from)
            if not date_to:
                date_to = timezone.now() + timezone.timedelta(days=1)
                date_to = get_date_start(date_to)

            date_from = date_from.replace(tzinfo=timezone.utc).astimezone(moscow_tz)
            date_to = date_to.replace(tzinfo=timezone.utc).astimezone(moscow_tz)

            filters = getattr(self, "filters", {})
            # queryset = self.cur_model.objects.filter(user__pk=partner, date__range=(date_from, date_to), **filters)
            # queryset = queryset.annotate(day=TruncDate('date')).values('day').annotate(count=Coalesce(Count('pk'), 0))
            days_range = [date_from + timedelta(days=x) for x in range((date_to - date_from).days + 1)]

            base_queryset = self.cur_model.objects.filter(user__pk=partner,
                                                          date__range=(date_from, date_to + timedelta(days=1)),
                                                          **filters)
            queryset = []
            for day in days_range:
                day_queryset = base_queryset.filter(
                    date__range=(day, day + timedelta(hours=23) + timedelta(minutes=59) + timedelta(seconds=59)))

                queryset.append({
                    "day": day.date(),
                    "count": day_queryset.count()
                })
            serializer = StatsSerializer(queryset, many=True)
        elif is_admin_or_manager(request):
            queryset = self.cur_model.objects.filter(user__pk=partner)
        else:
            return Response({"error": "Date range is not provided"}, status=status.HTTP_400_BAD_REQUEST)

        queryset = self.filter_queryset(queryset)
        print(self.cur_model, queryset)

        if not serializer:
            serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
