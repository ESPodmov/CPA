from django.contrib.auth.base_user import BaseUserManager
from django.apps import apps
from django.contrib.auth.hashers import make_password


class CustomUserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, username, email, password, phone, **extra_fields):
        print("in manager")
        if not username:
            raise ValueError("The given username must be set")
        email = self.normalize_email(email)
        GlobalUserModel = apps.get_model(
            self.model._meta.app_label, self.model._meta.object_name
        )
        username = GlobalUserModel.normalize_username(username)
        user = self.model(username=username, email=email, phone=phone, **extra_fields)
        user.password = make_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, email=None, password=None, phone=None, **extra_fields):
        return self._create_user(username, email, password, phone, **extra_fields)
