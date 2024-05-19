from functools import wraps

from rest_framework import status
from rest_framework.response import Response

from .utils import get_user, get_user_type


def needs_authorization(view_func):
    @wraps(view_func)
    def _wrapped_view(obj, request, *args, **kwargs):
        error_resp = Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
        if request.user:
            return error_resp
        cur_user = get_user(username=request.user.username)
        if not cur_user:
            return error_resp
        user_type = get_user_type(cur_user)
        return view_func(obj, request, authorized_user=cur_user, user_type=user_type, *args, **kwargs)

    return _wrapped_view
