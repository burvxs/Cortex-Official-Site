from django.db import models
from django.utils import timezone

class UserAccountManager(models.Manager):
    def create(self, email=None, password=None, password_confirm=None, full_name=None, phone_number=None):
        if(password is None):
            raise ValueError("The user must have a password")
        if (email is None):
            raise ValueError("User must have a email")

        user_obj = self.models.objects.create(
            password=password,
            password_confirm=password_confirm,
            email=email,
            full_name=full_name,
            phone_number=phone_number,
        )
        return user_obj


class UserAccount(models.Model):
    email = models.EmailField(blank=False, default="defaultemail@fake", max_length=254)
    full_name = models.CharField(blank=True, default="Skinny P", max_length=200)
    password = models.CharField(blank=False, default="1234", max_length=200)
    password_confirm = models.CharField(blank=False, default="1234", max_length=200)
    phone_number = models.PositiveIntegerField(blank=False, default="040404040")
    active = models.BooleanField(blank=True, default=True)
    timestamp = models.DateTimeField(blank=True, default=timezone.now)

    objects = UserAccountManager

    def __str__(self):
        return self.email

       

