# Generated by Django 4.2.13 on 2024-05-22 22:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authorization', '0002_alter_baseuser_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='baseuser',
            name='is_superuser',
            field=models.BooleanField(default=False, verbose_name='Is superuser'),
        ),
    ]
