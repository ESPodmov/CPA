from django.urls import path, include
from .views import sign_in, log_out, UserView
from rest_framework import routers

# user_router = routers.DefaultRouter()
# user_router.register("user", UserView, basename="user")

urlpatterns = [
    path('login/', sign_in, name="login"),
    path('logout/', log_out, name="logout"),
    path('user/', UserView.as_view(), name="user")
]

