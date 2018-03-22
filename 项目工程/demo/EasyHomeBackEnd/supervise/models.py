from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    name = models.CharField(max_length=20,blank=True)

    class Meta(AbstractUser.Meta):
        pass

    def __str__(self):
        return self.name


class AccountInfo(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=20)
    cancellation = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class PersonalInfo(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=20)
    age = models.IntegerField(default=0)
    career = models.CharField(max_length=20, default='null')

    def __str__(self):
        return self.name


