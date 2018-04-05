from django.urls import path
from django.conf.urls import url
from . import views

app_name = 'community'

urlpatterns = [
    path('', views.IndexView.as_view(), name='indexT'),
    path('<int:user_id>', views.IndexView.as_view(), name='index'),
    path('post/<int:pk>/', views.PostDetailView.as_view(), name='detail'),
    path('category/<int:pk>/', views.CategoryView.as_view(), name='category'),
    path('tag/<int:pk>/', views.TagView.as_view(), name='tag'),
    # url(r'^search/$', views.search, name='search'),
    url(r'^archives/(?P<year>[0-9]{4})/(?P<month>[0-9]{1,2})/$', views.ArchiveView.as_view(), name='archives'),

]
