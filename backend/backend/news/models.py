from django.db import models
from authorization.models import BaseUser


# def news_media_path(instance, filename):
#     return f"news/{instance.news.pk}/{filename}"
#
#
# class Media(models.Model):
#     FILE_TYPES = (
#         ('image', 'Изображение'),
#         ('audio', 'Аудио'),
#         ('video', 'Видео'),
#         ('other', 'Другое'),
#     )
#
#     src = models.FileField(upload_to=news_media_path)
#     alt = models.CharField(max_length=256, blank=True, null=True)
#
#     file_type = models.CharField(max_length=20, choices=FILE_TYPES, default='other')
#
#     def save(self, *args, **kwargs):
#         # При сохранении объекта Media, обновляем его тип на основе расширения файла
#         if self.src:
#             # Получаем расширение файла из имени файла
#             extension = self.src.name.split('.')[-1].lower()
#             # Определяем тип файла на основе расширения
#             if extension in ['jpg', 'jpeg', 'png', 'gif']:
#                 self.file_type = 'image'
#             elif extension in ['mp3', 'wav', 'ogg']:
#                 self.file_type = 'audio'
#             elif extension in ['mp4', 'avi', 'mov']:
#                 self.file_type = 'video'
#             else:
#                 self.file_type = 'other'
#         super().save(*args, **kwargs)


class News(models.Model):
    class Meta:
        verbose_name = "News"
        verbose_name_plural = "News"

    title = models.CharField(max_length=256, blank=False, null=False)
    short = models.TextField(blank=True, null=False)
    body = models.TextField(blank=False, null=False)
    creator = models.ForeignKey(BaseUser, on_delete=models.DO_NOTHING)
    created_at = models.DateTimeField(auto_now_add=True)
    edited_at = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=False, null=False, blank=False)
    # medias = models.ManyToManyField(Media, related_name="news")

    def __str__(self):
        return self.title
