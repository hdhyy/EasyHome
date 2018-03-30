from django.db import models


class ManagedFile(models.Model):
    name = models.CharField(max_length=50)
    exName = models.CharField(max_length=10)
    upload_time = models.DateTimeField(auto_now_add=True)
    validate = models.BooleanField(default=True)
    file = models.FileField(upload_to='files', default=None)
    path = models.FilePathField()

