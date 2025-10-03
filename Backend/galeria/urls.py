from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FotoViewSet

router = DefaultRouter()
router.register(r'fotos', FotoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]