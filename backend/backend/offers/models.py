from django.db import models
from .utils import set_token_exp_date, generate_secret


class SecretKey(models.Model):
    class Meta:
        verbose_name = "Secret"
        verbose_name_plural = "Secrets"

    token = models.CharField(max_length=68, unique=True, blank=False, null=False)
    creation_date = models.DateTimeField(auto_now_add=True, blank=False, null=False)
    exp_date = models.DateTimeField(default=set_token_exp_date, blank=False, null=False)


class Partner(models.Model):
    class Meta:
        verbose_name = "Partner"
        verbose_name_plural = "Partners"

    name = models.CharField(max_length=255, null=False, blank=False, unique=True)
    about = models.TextField()
    secret = models.ForeignKey(SecretKey, on_delete=models.DO_NOTHING, null=False, blank=False, related_name="partner")

    def save(self, *args, **kwargs):
        if not self.pk:
            secret_key = SecretKey.objects.create(
                token=generate_secret(),
            )
            self.secret = secret_key
        super(Partner, self).save(*args, **kwargs)


class OfferType(models.Model):
    class Meta:
        verbose_name = "Offer type"
        verbose_name_plural = "Offer types"

    # Affilate cpa cpc Agregator
    name = models.CharField(max_length=128, null=False, blank=False, unique=True)


class TargetAction(models.Model):
    class Meta:
        verbose_name = "Target action"
        verbose_name_plural = "Target actions"

    name = models.CharField(max_length=128, null=False, blank=False, unique=True)
    # description = models.CharField(max_length=255, null=False, blank=False)


class OfferCategory(models.Model):
    class Meta:
        verbose_name = "Offer category"
        verbose_name_plural = "Offer categories"

    name = models.CharField(max_length=128, null=False, blank=False, unique=True)


class OfferMedia(models.Model):
    class Meta:
        verbose_name = "Offer media"
        verbose_name_plural = "Offer medias"

    FILE_TYPES = (
        ('image', 'Изображение'),
        ('audio', 'Аудио'),
        ('video', 'Видео'),
        ('file', 'Файл'),
        ('license', 'Лицензия'),
        ('other', 'Другое'),
    )

    src = models.URLField(null=False, blank=False)
    alt = models.CharField(max_length=255, blank=False, null=False)
    file_type = models.CharField(max_length=20, choices=FILE_TYPES, default='other', blank=False, null=False)


def offer_upload_path(instance, filename):
    return f'offers/{instance.pk}.{filename.split(".")[-1]}'


class Offer(models.Model):
    class Meta:
        verbose_name = "Offer"
        verbose_name_plural = "Offers"

    image = models.ImageField(upload_to=offer_upload_path)
    category = models.ForeignKey(OfferCategory, on_delete=models.DO_NOTHING, blank=False, null=False,
                                 related_name="offers")
    name = models.CharField(max_length=255, null=False, blank=False)
    partner = models.ForeignKey(Partner, on_delete=models.CASCADE, blank=False, null=False, related_name="offers")
    type = models.ForeignKey(OfferType, on_delete=models.SET_NULL, blank=False, null=True)
    reward_from = models.IntegerField(blank=False, null=True)
    reward_to = models.IntegerField(blank=False, null=True)
    medias = models.ManyToManyField(OfferMedia, related_name="offer")
    description = models.TextField(blank=True, null=False)
    rules = models.TextField(blank=False, null=False)
    target_action = models.ForeignKey(TargetAction, on_delete=models.SET_NULL, blank=True, null=True)
    source_url = models.URLField(null=False, blank=False)