from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from offers.views import redirect_view

api_urls = [
    path('users/', include(('authorization.urls', 'authorization'), namespace="authorization")),
    path('news/', include(('news.urls', 'news'), namespace="news")),
    path('offers/', include(('offers.urls', 'offers'), namespace="offers")),
    path('payouts/', include(('payouts.urls', 'payouts'), namespace="payouts")),
    path('', include(('stats.urls', 'stats'), namespace="stats")),

]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(api_urls)),
    path('offers/<int:pk>/', redirect_view),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
