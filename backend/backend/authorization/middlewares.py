from django.middleware.common import CommonMiddleware
from copy import deepcopy


class CSRFTokenFromCookieMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        csrf_token = request.COOKIES.get('csrftoken')
        if csrf_token:
            request.META['CSRF_COOKIE'] = csrf_token
        return self.get_response(request)
