# Generated by Django 3.0.6 on 2020-05-27 05:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraccount',
            name='phone_number',
            field=models.PositiveIntegerField(default='040404040', max_length=25),
        ),
    ]
