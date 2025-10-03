from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'trabajadores', views.TrabajadorViewSet, basename='trabajadores')

urlpatterns = [
    path('', include(router.urls)),
    ]