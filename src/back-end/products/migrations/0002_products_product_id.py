# Generated by Django 3.0.6 on 2020-05-25 12:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='products',
            name='product_id',
            field=models.CharField(default='', max_length=50),
        ),
    ]
