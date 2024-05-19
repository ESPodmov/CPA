from rest_framework import permissions
from .utils import get_user, get_user_type, UserType

from .utils import get_user_type_short


def is_admin_or_manager(request):
    if not request.user:
        return False
    user_type = get_user_type_short(request.user.username)
    return user_type and (user_type == UserType.manager or user_type == UserType.admin)


class IsAdminOrManager(permissions.BasePermission):
    def has_permission(self, request, view):
        return is_admin_or_manager(request)


class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user:
            return False
        user_type = get_user_type(get_user(username=request.user.username))
        return user_type and user_type == UserType.admin


class IsAuthorized(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user:
            return False
        user_type = get_user_type(get_user(username=request.user.username))
        return user_type is not None
