from django.contrib import admin
from .models import TargetAction, OfferType, OfferCategory, OfferMedia, Offer, Partner

# Register your models here.
admin.site.register(TargetAction)
admin.site.register(OfferType)
admin.site.register(OfferCategory)
admin.site.register(OfferMedia)
admin.site.register(Offer)
admin.site.register(Partner)
