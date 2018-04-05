# Generated by Django 2.0.3 on 2018-04-05 17:13

import design.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('design', '0003_auto_20180330_1409'),
    ]

    operations = [
        migrations.CreateModel(
            name='IndoorType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
                ('room', models.IntegerField(default=0)),
                ('office', models.IntegerField(default=0)),
                ('kitchen', models.IntegerField(default=0)),
                ('bathroom', models.IntegerField(default=0)),
                ('file', models.FileField(upload_to=design.models.upload_to)),
            ],
        ),
    ]
