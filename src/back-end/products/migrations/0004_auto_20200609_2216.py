# Generated by Django 3.0.6 on 2020-06-09 12:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0003_auto_20200525_2243'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='product_id',
            field=models.CharField(blank=True, default='', max_length=50),
        ),
    ]
