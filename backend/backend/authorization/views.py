import re
from typing import Union, Type

from django.contrib.auth import login, logout, authenticate
from django.utils.translation import gettext_lazy as _
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework import status
from .models import User, BaseUser
from .serializers import UserSerializer, BaseUserSerializer
from django.db.utils import IntegrityError
from .decorators import needs_authorization
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from .utils import get_user


# @csrf_exempt
@api_view(["GET"])
@ensure_csrf_cookie
def get_csrf(request):
    return Response({"message": "set"})
    # response = Response({'detail': 'CSRF cookie set'})
    # q = get_token(request)
    # print(q)
    # response.set_cookie('csrftoken', q, httponly=False)
    # return response


class LoginView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            res = Response({"message": "Login successful"}, status=200)
            return res
        else:
            return Response({"error": "Invalid credentials"}, status=400)


@api_view(["POST"])
def log_out(request):
    logout(request)
    return Response({"success": _("Logged out")}, status=status.HTTP_200_OK)


def select_serializer(user: BaseUser) -> Union[Type[UserSerializer], Type[BaseUserSerializer]]:
    if isinstance(user, User):
        return UserSerializer
    elif isinstance(user, BaseUser):
        return BaseUserSerializer


def get_serializer(user: BaseUser, partial: bool = False, data=None) -> Union[UserSerializer, BaseUserSerializer]:
    serializer = select_serializer(user)
    if not data:
        return serializer(user, partial=partial)
    return serializer(user, partial=partial, data=data)


class UserView(APIView):

    @needs_authorization
    def get(self, request, authorized_user) -> Response:
        find = [{key: request.GET.get(key)} for key in ["id", "pk", "username", "phone"]]

        if authorized_user.is_staff or authorized_user.is_admin or authorized_user.is_superuser:
            if find:
                user = get_user(**find[0])
            else:
                user = authorized_user
        else:
            user = authorized_user

        serializer = get_serializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request) -> Response:
        """
        request may contain type param in order to determine which type of user create
        :type (admin, manager, user) or blank
        """

        user_type = request.data.get("type", "user")
        current_user = get_user(pk=request.user.pk)
        new_password = request.data.get("password")
        new_email = request.data.get("email")
        user_data = {"password": new_password, "email": new_email}
        new_user = None
        if user_type == "user" and not current_user:
            new_user = User(**user_data)
        elif current_user.is_admin:
            if user_type == "manager":
                new_user = BaseUser.objects.create_manager(**user_data)
            elif user_type == "admin" and current_user.is_superuser:
                new_user = BaseUser.objects.create_admin(**user_data)

        if not new_user:
            return Response({"error": _("Permission denied")}, status=status.HTTP_403_FORBIDDEN)
        try:
            new_user.save()
        except IntegrityError as e:
            err_msg = str(e)
            if "UNIQUE" in err_msg:
                if "username" in err_msg:
                    msg = "This username already taken"
                elif "phone" in err_msg:
                    msg = "This phone already registered"
                elif "email" in err_msg:
                    msg = "This email already registered"
                else:
                    msg = "Something went wrong"
                return Response({"error": _(msg)}, status=status.HTTP_409_CONFLICT)

        return Response({"success": "User successfully created"}, status=status.HTTP_200_OK)

    @needs_authorization
    def delete(self, request, authorized_user) -> Response:
        pk = request.POST.get("pk")
        if pk:
            user = get_user(pk=pk)
        else:
            user = authorized_user
        if not user:
            return Response({"error": "Not found"}, status=status.HTTP_404_NOT_FOUND)

        is_deleted = False

        if authorized_user.pk == user.pk:
            is_deleted = True
        elif authorized_user.is_admin:
            if authorized_user.is_main:
                is_deleted = True
            elif authorized_user.is_staff or not authorized_user.is_staff:
                is_deleted = False

        if not is_deleted:
            return Response({"error": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)

        user.delete()
        return Response({"success": "You have deleted account"}, status.HTTP_200_OK)

    @needs_authorization
    def patch(self, request, authorized_user) -> Response:
        edit_user_pk = request.data.get("pk", None)
        if not edit_user_pk:
            edit_user_pk = request.user.pk
            # return Response({"error": "Wrong data provided"}, status=status.HTTP_400_BAD_REQUEST)

        if authorized_user.is_admin:
            change = True
        elif authorized_user.is_staff or not authorized_user.is_staff:
            if authorized_user.pk == edit_user_pk:
                change = True
            else:
                change = False
        else:
            change = False

        if not change:
            return Response({"error": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)

        edit_user = get_user(pk=edit_user_pk)
        serializer = get_serializer(edit_user, partial=True, data=request.data)
        if not serializer.is_valid():
            return Response({"error": "Wrong data provided"}, status=status.HTTP_400_BAD_REQUEST)
        updated_user = serializer.update(edit_user, request.data)
        if "password" in request.data:
            login(request, updated_user)
        return Response(get_serializer(updated_user).data, status=status.HTTP_200_OK)
