from django.db import models
from django.db.models import IntegerField, CharField, EmailField, FloatField, BooleanField
from django.contrib.auth.models import AbstractBaseUser
from .validators import UnicodeUsernameValidator
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from django.core.mail import send_mail
from .managers import CustomUserManager


class BaseUser(AbstractBaseUser):
    class Meta:
        verbose_name = "BaseUser"
        verbose_name_plural = "BaseUsers"

    username_validator = UnicodeUsernameValidator()

    # username = models.CharField(
    #     _("username"),
    #     max_length=60,
    #     unique=True,
    #     help_text=_(
    #         "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
    #     ),
    #     validators=[username_validator],
    #     error_messages={
    #         "unique": _("A user with that username already exists."),
    #     },
    # )
    phone = CharField(max_length=14, null=False, blank=True, unique=True)
    email = EmailField(max_length=60, null=False, blank=False, unique=True)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(_("date joined"), default=timezone.now)

    objects = CustomUserManager()

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    def email_user(self, subject, message, from_email=None, **kwargs):
        send_mail(subject, message, from_email, [self.email], **kwargs)

    def save(self, *args, **kwargs):
        # Вызываем create_user только если объект еще не сохранен в базе данных
        if not self.pk and "using" not in kwargs:
            # Вызываем метод create_user, передавая аргументы объекта модели
            User.objects.create_user(email=self.email, password=self.password, phone=self.phone)
            return
        # Вызываем оригинальный метод save
        super(BaseUser, self).save(*args, **kwargs)


class User(BaseUser):
    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"

    balance = FloatField(null=False, default=0.0, blank=False)
    fio = CharField(max_length=255, null=False, blank=True)
    name = CharField(max_length=255, null=False, blank=True)
    tg_username = CharField(max_length=120, null=False, blank=True)


class Admin(BaseUser):
    class Meta:
        verbose_name = "Admin"
        verbose_name_plural = "Admins"

    is_main = BooleanField(null=False, blank=False, default=False)


class Manager(BaseUser):
    class Meta:
        verbose_name = "Manager"
        verbose_name_plural = "Managers"
