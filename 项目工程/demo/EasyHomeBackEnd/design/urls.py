from django.urls import path
from . import views

app_name = 'design'
urlpatterns = [
    path('thanks/', views.ThanksView.as_view(), name='thanks'),
    path('designface/<int:pk>/', views.DesignFaceView.as_view(), name='designface'),
    path('models/add/', views.ModelAddView.as_view(), name='addModel'),
    path('models/list/<int:user_id>', views.ModelListView.as_view(), name='listModel'),
    path('models/<int:pk>/', views.ModelDetailView.as_view(), name='seeModel'),
    path('modeltest/<int:pk>/', views.ModelTestView.as_view(), name='testModel'),

    path('textures/add/', views.TextureAddView.as_view(), name='addTexture'),
    path('textures/list/<int:user_id>', views.TextureListView.as_view(), name='listTexture'),
    path('textures/<int:pk>/', views.TextureDetailView.as_view(), name='seeTexture'),
]
