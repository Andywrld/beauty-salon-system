from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'promociones', views.PromocionViewSet, basename='promociones')

urlpatterns = [
    path('', include(router.urls)),
]