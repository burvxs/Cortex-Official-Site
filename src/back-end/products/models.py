from django.db import models
from django.db.models.signals import pre_save

from .utils import gen_product_id

class Product(models.Model):
    product_id = models.CharField(default="", blank=True, max_length=50)
    title = models.CharField(default="Product Title", blank=False, max_length=50)
    slug = models.SlugField(default="Product Slug", blank=True, max_length=50)
    description = models.TextField(max_length=220)
    price = models.DecimalField(default=0.00, blank=False, max_digits=10, decimal_places=2)
    image_path = models.CharField(blank=False, default="", max_length=400)
    active = models.BooleanField(default=True)
    timestamp = models.DateTimeField(auto_now_add=False)

    def __str__(self):
        return self.title 

def on_create_receiver(sender, instance, *args, **kwargs):
    if not instance.product_id:
        instance.product_id = gen_product_id()
    if not instance.slug:
        instance.slug = instance.title + "_" + instance.product_id

pre_save.connect(on_create_receiver, sender=Product)

