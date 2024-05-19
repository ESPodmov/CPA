import uuid

from django.utils import timezone


def generate_secret():
    return uuid.uuid4().hex + uuid.uuid4().hex


def set_token_exp_date():
    return timezone.now() + timezone.timedelta(days=1)
