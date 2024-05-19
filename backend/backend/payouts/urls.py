from django.urls import path
from .views import PayoutListView, PayoutUpdateView


urlpatterns = [
    path('all/', PayoutListView.as_view(), name="all"),
    path('<int:pk>/edit/', PayoutUpdateView.as_view(), name="edit")
]

