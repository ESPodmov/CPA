from functools import wraps

from rest_framework import status
from rest_framework.response import Response

from .utils import get_user


def needs_authorization(view_func):
    @wraps(view_func)
    def _wrapped_view(obj, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
        cur_user = get_user(email=request.user.email)
        if not cur_user:
            return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
        return view_func(obj, request, authorized_user=cur_user, *args, **kwargs)

    return _wrapped_view
