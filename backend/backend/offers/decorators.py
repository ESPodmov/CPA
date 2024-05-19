from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from functools import wraps
from .models import SecretKey
from .utils import generate_secret


def token_required(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        token = request.headers.get('Authorization')

        if not token:
            return Response({'error': 'Token is missing'}, status=status.HTTP_401_UNAUTHORIZED)

        token = token.split()[-1]

        try:
            secret_key = SecretKey.objects.get(token=token)
            if secret_key.exp_date < timezone.now():
                partner_company = secret_key.partner
                new_token = generate_secret()
                new_secret = SecretKey.objects.create(token=new_token)
                partner_company.secret = new_secret
                partner_company.save()
                kwargs["new_secret_token"] = new_token
                secret_key.delete()

        except SecretKey.DoesNotExist:
            return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
        return view_func(request, *args, **kwargs)

    return _wrapped_view
