# Generated by Django 4.2.13 on 2024-06-05 03:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authorization', '0003_alter_baseuser_is_superuser'),
        ('offers', '0003_alter_offer_medias_alter_offer_reward_from_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserOffer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('offer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_offers', to='offers.offer')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='authorization.user')),
            ],
        ),
    ]