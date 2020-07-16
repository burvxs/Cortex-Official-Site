from rest_framework import viewsets
from .serialisers import AccountSerialiser
from rest_framework.views import APIView
from .models import UserAccount
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
import json

class AccountView(viewsets.ModelViewSet):
    serializer_class = AccountSerialiser
    queryset = UserAccount.objects.all()

    def create(self, validated_data):
        print(validated_data.data)
        data = validated_data.data
        queryset = UserAccount.objects.all()
        email_exists = None
        if queryset.filter(email=data['email']).exists():
            email_exists = True
            return Response({"validity" : email_exists})
        else:
            UserAccount.objects.create( full_name=data['firstname'] + " " + data['lastname'],
                                        email=data['email'],
                                        password=make_password(data['password']))
            return Response(validated_data.data, status=status.HTTP_200_OK)
        return Response("error", status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
      queryset = UserAccount.objects.all()
      serialiser = AccountSerialiser(queryset, many=True)
      if request.method == "GET":
         return Response(serialiser.data, status=status.HTTP_200_OK)
      return Response({"message" : "Nothing was listed"}, status=status.HTTP_204_NO_CONTENT)





