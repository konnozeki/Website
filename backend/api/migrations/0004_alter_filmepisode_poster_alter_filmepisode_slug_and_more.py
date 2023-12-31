# Generated by Django 4.2 on 2023-12-26 02:34

import api.models
import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_remove_filmepisode_avatar_filmepisode_poster'),
    ]

    operations = [
        migrations.AlterField(
            model_name='filmepisode',
            name='poster',
            field=models.ImageField(null=True, upload_to=api.models.film_episode_poster_path),
        ),
        migrations.AlterField(
            model_name='filmepisode',
            name='slug',
            field=models.SlugField(null=True),
        ),
        migrations.AlterField(
            model_name='ratefilm',
            name='rate',
            field=models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(5)]),
        ),
    ]
