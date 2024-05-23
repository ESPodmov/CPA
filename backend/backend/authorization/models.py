import re

from django.db import models
from django.db.models import IntegerField, CharField, EmailField, FloatField, BooleanField, URLField
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .validators import UnicodeUsernameValidator
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from django.core.mail import send_mail
from .managers import CustomUserManager
from django.core.exceptions import ValidationError


class BaseUser(AbstractBaseUser, PermissionsMixin):
    class Meta:
        verbose_name = _("Base User")
        verbose_name_plural = _("Base Users")

    username_validator = UnicodeUsernameValidator()

    is_superuser = BooleanField(_("Is superuser"), default=False)
    is_staff = BooleanField(default=False)
    is_admin = BooleanField(default=False)
    phone = CharField(max_length=14, null=False, blank=True)
    email = EmailField(max_length=60, null=False, blank=False, unique=True)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(_("date joined"), default=timezone.now)

    objects = CustomUserManager()

    # EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)
        if self.phone:
            if self.__class__.objects.filter(phone=self.phone).exists():
                raise ValidationError({"phone": _("A user with that phone already exists")})

    def email_user(self, subject, message, from_email=None, **kwargs):
        send_mail(subject, message, from_email, [self.email], **kwargs)

    def save(self, *args, **kwargs):

        if self.phone:
            self.phone = re.sub(r'\D', '', str(self.phone))

        if not self.pk and "using" not in kwargs:
            User.objects.create_user(email=self.email, password=self.password)
            return
        super(BaseUser, self).save(*args, **kwargs)


class User(BaseUser):
    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")

    balance = FloatField(null=False, default=0.0, blank=False)
    fio = CharField(max_length=255, null=False, blank=True)
    name = CharField(max_length=255, null=False, blank=True)
    tg_username = CharField(max_length=120, null=False, blank=True)
    link = URLField(blank=True, null=False)
    activity = CharField(max_length=128, blank=True, null=False)

    def save(self, *args, **kwargs):
        if self.tg_username:
            self.tg_username = str(self.tg_username).replace("@", "")
        super(User, self).save(*args, **kwargs)
