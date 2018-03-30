from django.urls import path
from . import views

app_name = 'design'
urlpatterns = [
    path('designface/', views.designface, name='designface'),
    path('models/add/', views.ModelAddView.as_view(), name='addModel'),
    path('models/list/<int:user_id>', views.ModelListView.as_view(), name='listModel'),
    path('models/<int:pk>/', views.ModelDetailView.as_view(), name='seeModel'),
    path('thanks/', views.ThanksView.as_view(), name='thanks'),
    path('modeltest/<int:pk>/', views.ModelTestView.as_view(), name='testModel'),
]
