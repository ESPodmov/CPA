from django.urls import path
from .views import LoginView, log_out, UserView, get_csrf


urlpatterns = [
    path('login/', LoginView.as_view(), name="login"),
    path('logout/', log_out, name="logout"),
    path('user/', UserView.as_view(), name="user"),
    path('csrf/', get_csrf, name="csrf")
]

