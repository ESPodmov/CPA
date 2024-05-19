from django.urls import path, include
from .views import NewsListView, NewsView, NewsShortView, NewsShortListView, NewsCreateView

urlpatterns = [
    path('', NewsShortListView.as_view(), name="news_list"),
    path('<int:pk>/', NewsShortView.as_view(), name="news_retrieve"),
    path('create/', NewsCreateView.as_view(), name="news_create"),
    path('edit/all/', NewsListView.as_view(), name="news_list_full"),
    path('<int:pk>/edit/', NewsView.as_view(), name="edit_news")
]
