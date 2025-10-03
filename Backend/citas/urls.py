from django.urls import path, include
from rest_framework import routers
from . import views
from .views import availability

router = routers.DefaultRouter()
router.register(r'citas', views.CitaViewSet, basename='citas')

urlpatterns = [
    path('', include(router.urls)),
    path('availability/', availability, name='availability')
    
]