from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from .models import BaseUser, User


admin.site.register(BaseUser, verbose_name=_("Base User"))
admin.site.register(User, verbose_name=_("User"))

# Register your models here.
