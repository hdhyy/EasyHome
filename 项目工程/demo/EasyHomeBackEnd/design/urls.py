from django.urls import path
from . import views


app_name = 'design'
urlpatterns = [
    path('designface/', views.designface, name='designface'),

]
