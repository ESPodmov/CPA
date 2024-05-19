from django.db import models
from offers.models import Offer
from authorization.models import User


class Click(models.Model):
    offer = models.ForeignKey(Offer, on_delete=models.CASCADE, null=False, blank=False, related_name="clicks")
    ip_address = models.GenericIPAddressField(null=False, blank=False)
    date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False, related_name="clicks")


class Conversion(models.Model):
    click = models.ForeignKey(Click, on_delete=models.SET_NULL, null=True, blank=False, related_name='conversions')
    offer = models.ForeignKey(Offer, on_delete=models.CASCADE, null=False, blank=False, related_name="conversions")
    date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False, related_name="conversions")

