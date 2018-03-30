from django.urls import path
from . import views

urlPattern = [
    path('files/list', views.FileListView.as_view(),name='listFile')
]