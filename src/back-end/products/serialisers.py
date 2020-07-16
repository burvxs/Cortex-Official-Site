from rest_framework import serializers
from .models import Product

class ProductSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('product_id', 'title', 'slug', 'description', 'price', 'image_path', 'active', 'timestamp')
