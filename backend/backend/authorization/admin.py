from django.contrib import admin
from .models import BaseUser, User, Admin, Manager


admin.site.register(BaseUser)
admin.site.register(User)
admin.site.register(Admin)
admin.site.register(Manager)

# Register your models here.
