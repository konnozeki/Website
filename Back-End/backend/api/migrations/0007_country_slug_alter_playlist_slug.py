# Generated by Django 4.2 on 2023-12-26 11:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_tracking_time'),
    ]

    operations = [
        migrations.AddField(
            model_name='country',
            name='slug',
            field=models.SlugField(null=True),
        ),
        migrations.AlterField(
            model_name='playlist',
            name='slug',
            field=models.SlugField(null=True),
        ),
    ]
