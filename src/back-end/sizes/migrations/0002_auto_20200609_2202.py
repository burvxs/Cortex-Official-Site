# Generated by Django 3.0.6 on 2020-06-09 12:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sizes', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='clothingsize',
            name='tshirt_sizes',
            field=models.CharField(default='', max_length=4),
        ),
    ]
