from django.db import models

# Create your models here.
class ClothingSize(models.Model):
    tshirt_sizes = models.CharField(default="", blank=False, max_length=4)