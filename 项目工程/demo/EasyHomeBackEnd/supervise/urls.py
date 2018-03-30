from django.conf.urls import url
from django.urls import path
from . import views

app_name = 'supervise'
urlpatterns = [
    path('register/', views.register, name='register'),
    path('myinfo/<int:pk>/', views.UserDetailView.as_view(), name='myinfo'),
]