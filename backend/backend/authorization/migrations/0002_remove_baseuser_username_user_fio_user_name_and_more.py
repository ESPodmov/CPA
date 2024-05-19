# Generated by Django 5.0.6 on 2024-05-19 17:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authorization', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='baseuser',
            name='username',
        ),
        migrations.AddField(
            model_name='user',
            name='fio',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='user',
            name='name',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='user',
            name='tg_username',
            field=models.CharField(blank=True, max_length=120),
        ),
        migrations.AlterField(
            model_name='baseuser',
            name='phone',
            field=models.CharField(blank=True, max_length=14, unique=True),
        ),
    ]