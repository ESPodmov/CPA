from django.contrib.auth.base_user import BaseUserManager
from django.apps import apps
from django.contrib.auth.hashers import make_password


class CustomUserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        # if not username:
        #     raise ValueError("The given username must be set")
        email = self.normalize_email(email)
        # GlobalUserModel = apps.get_model(
        #     self.model._meta.app_label, self.model._meta.object_name
        # )
        # username = GlobalUserModel.normalize_username(username)
        user = self.model(email=email, **extra_fields)
        user.password = make_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_admin", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        if extra_fields.get("is_admin") is not True:
            raise ValueError("Superuser must have is_admin=True.")
        return self._create_user(email, password, **extra_fields)

    def create_manager(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", False)
        extra_fields.setdefault("is_admin", False)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Manager must have is_staff=True.")
        if extra_fields.get("is_superuser") is not False:
            raise ValueError("Manager must have is_superuser=False.")
        if extra_fields.get("is_admin") is not False:
            raise ValueError("Manager must have is_admin=False.")
        return self._create_user(email, password, **extra_fields)

    def create_admin(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", False)
        extra_fields.setdefault("is_admin", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Admin must have is_staff=True.")
        if extra_fields.get("is_superuser") is not False:
            raise ValueError("Admin must have is_superuser=False.")
        if extra_fields.get("is_admin") is not True:
            raise ValueError("Admin must have is_admin=True.")
        return self._create_user(email, password, **extra_fields)
