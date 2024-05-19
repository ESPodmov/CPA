from django.urls import path, include
from .views import ClickListView, ConversionListView, ConversionCreateView

conversion_urls = [
    path('all/', ConversionListView.as_view(), name="all"),
    path('approve/', ConversionCreateView.as_view(), name="approve"),
]

urlpatterns = [
    path('clicks/all/', ClickListView.as_view(), name="clicks-all"),
    path('conversions/', include(conversion_urls)),
]
