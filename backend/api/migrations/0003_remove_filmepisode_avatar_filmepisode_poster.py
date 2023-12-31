# Generated by Django 4.2 on 2023-12-25 11:27

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_rename_country_flag_country_flag_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='filmepisode',
            name='avatar',
        ),
        migrations.AddField(
            model_name='filmepisode',
            name='poster',
            field=models.ImageField(null=True, upload_to=api.models.film_poster_path),
        ),
    ]