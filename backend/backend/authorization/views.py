import re
from typing import Union, Type

from django.contrib.auth import login, logout
from .utils import authenticate, get_user, UserType
from django.utils.translation import gettext_lazy as _
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Admin, Manager, User
from django.contrib.auth.models import User as BaseUser
from .serializers import AdminSerializer, UserSerializer, ManagerSerializer, BaseUserSerializer
from django.db.utils import IntegrityError
from .decorators import needs_authorization


@api_view(["POST"])
def sign_in(request):
    username = request.POST.get("username")
    if not username:
        phone = request.POST.get("phone")
        identify = {"phone": phone}
    else:
        identify = {"username": username}

    password = request.POST.get("password")
    user = authenticate(**identify, password=password)

    if not user:
        return Response({"error": _("Unauthorized")}, status=status.HTTP_401_UNAUTHORIZED, )

    login(request, user)
    return Response({"success": _("Authorized")}, status=status.HTTP_200_OK)


@api_view(["POST"])
def log_out(request):
    logout(request)
    return Response({"success": _("Logged out")}, status=status.HTTP_200_OK)


class UserView(APIView):

    def get_serializer(self, user: BaseUser, partial: bool = False) -> Union[
        UserSerializer, AdminSerializer, ManagerSerializer]:
        if isinstance(user, User):
            return UserSerializer(user, partial=partial)
        elif isinstance(user, Admin):
            return AdminSerializer(user, partial=partial)
        else:
            return ManagerSerializer(user, partial=partial)

    @needs_authorization
    def get(self, request, authorized_user, user_type) -> Response:
        find = [{key: request.GET.get(key)} for key in ["id", "pk", "username", "phone"]]
        # if not find:
        #     return Response(status=status.HTTP_400_BAD_REQUEST, content_type="json",
        #                     data={"error": _("Wrong data provided")})

        if user_type in (UserType.admin or UserType.manager):
            if find:
                user = get_user(**find[0])
            else:
                user = authorized_user
        else:
            user = authorized_user

        # if not user:
        #     return Response({"error": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)
        serializer = self.get_serializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request) -> Response:
        """
        request may contain type param in order to determine which type of user create
        :type (admin, manager, user) or blank
        """
        user_type = request.POST.get("type", "user")
        current_user = get_user(pk=request.user.pk)
        new_username = request.POST.get("username")
        new_password = request.POST.get("password")
        new_phone = request.POST.get("phone")
        new_phone = ''.join(re.findall(r'\d+', new_phone))
        new_email = request.POST.get("email")
        user_data = {"username": new_username, "password": new_password, "phone": new_phone, "email": new_email}

        new_user = None
        if user_type == "user" and not current_user:
            new_user = User(**user_data)
        elif isinstance(current_user, Admin):
            if user_type == "manager":
                new_user = Manager(**user_data)
            elif user_type == "admin" and current_user.is_main:
                new_user = Admin(**user_data)

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
    def delete(self, request, authorized_user, user_type) -> Response:
        pk = request.POST.get("pk")
        if pk:
            user = get_user(pk=pk)
        else:
            user = authorized_user
        if not user:
            return Response({"error": "Not found"}, status=status.HTTP_404_NOT_FOUND)

        is_deleted = False

        if authorized_user.pk == pk:
            is_deleted = True
        elif user_type == UserType.admin:
            if authorized_user.is_main:
                is_deleted = True
            elif user_type in (UserType.user, UserType.manager):
                is_deleted = False

        if not is_deleted:
            return Response({"error": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)

        user.delete()
        return Response({"success": "You have deleted account"}, status.HTTP_200_OK)

    @needs_authorization
    def patch(self, request, authorized_user, user_type) -> Response:
        edit_user_pk = request.POST.get("pk", None)
        if not edit_user_pk:
            return Response({"error": "Wrong data provided"}, status=status.HTTP_400_BAD_REQUEST)

        if user_type == UserType.admin:
            change = True
        elif user_type in (UserType.manager, UserType.user):
            if authorized_user.pk == edit_user_pk:
                change = True
            else:
                change = False
        else:
            change = False

        if not change:
            return Response({"error": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)

        current_user = get_user(pk=request.user.pk)
        serializer = self.get_serializer(current_user, partial=True)
        if not serializer.is_valid():
            return Response({"error": "Wrong data provided"}, status=status.HTTP_400_BAD_REQUEST)
        updated_user = serializer.update(current_user, request.POST)
        if "password" in request.POST:
            login(request, updated_user)
        return Response(self.get_serializer(updated_user).data, status=status.HTTP_200_OK)
