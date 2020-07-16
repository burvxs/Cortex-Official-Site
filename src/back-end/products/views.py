from django.shortcuts import render
from rest_framework import viewsets
from .serialisers import ProductSerialiser
from rest_framework.response import Response
from django.http import QueryDict
from rest_framework import status
from .utils import get_range_digits
import django_filters
from .models import Product
import json

class ProductView(viewsets.ModelViewSet):
    serializer_class = ProductSerialiser
    queryset = Product.objects.all()

    def get_queryset(self):
        if self.request.method == "GET":
            queryset = Product.objects.all()
            url_query_price_range = self.request.GET.get("price__range", None)
            if url_query_price_range is not None:
                p_range_ints = get_range_digits(url_query_price_range)
                queryset = queryset.filter(price__range=(p_range_ints[0], p_range_ints[1]))
        return queryset

    def list(self, request):
        queryset = self.get_queryset()
        serialiser = ProductSerialiser(queryset, many=True)      
        return Response({"products" : serialiser.data, "product_count" : queryset.count()})



    

 
