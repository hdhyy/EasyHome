from django.urls import path
from django.conf.urls import url
from . import views

app_name = 'community'

urlpatterns = [
    path('', views.index, name='index'),
    path('post/<int:pk>/', views.detail, name='detail'),
    url(r'^archives/(?P<year>[0-9]{4})/(?P<month>[0-9]{1,2})/$', views.archives, name='archives'),
    url(r'^category/(?P<pk>[0-9]+)/$', views.category, name='category'),
]
