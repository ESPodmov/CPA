from django.db import models
from stats.models import Conversion
from authorization.models import User


class Payout(models.Model):
    PENDING = 'Pending'
    PROCESSING = 'Processing'
    COMPLETED = 'Completed'
    FAILED = 'Failed'
    CANCELLED = 'Cancelled'

    STATUS_CHOICES = [
        (PENDING, 'Pending'),
        (PROCESSING, 'Processing'),
        (COMPLETED, 'Completed'),
        (FAILED, 'Failed'),
        (CANCELLED, 'Cancelled'),
    ]
    conversion = models.ForeignKey(Conversion, on_delete=models.SET_NULL, null=True, blank=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False)
    amount = models.IntegerField(blank=False, null=False, default=0)
    date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=PENDING)
