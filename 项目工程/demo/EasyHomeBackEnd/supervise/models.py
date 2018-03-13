from django.db import models


class User(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name


class AccountInfo(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    name = models.CharField(max_length=20)


class PersonalInfo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=20)