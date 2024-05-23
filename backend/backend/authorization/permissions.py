from rest_framework import permissions


def is_admin_or_manager(request):
    if not request.user or not request.user.is_authenticated:
        return False
    return request.user.is_admin or request.user.is_staff or request.user.is_superuser


class IsAdminOrManager(permissions.BasePermission):
    def has_permission(self, request, view):
        return is_admin_or_manager(request)


class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        return request.user.is_superuser or request.user.is_admin


class IsAuthorized(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user:
            return False
        return request.user.is_authenticated
