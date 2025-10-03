from django.urls import path, include
from rest_framework import routers
from . import views
from .views import CustomTokenObtainPairView, RegistroUsuarioView,AdminDashboardView

router = routers.DefaultRouter()
router.register(r'usuarios', views.UsuarioViewSet, basename='usuarios')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('registro/', RegistroUsuarioView.as_view(), name='registro_cliente'),
    path('api/dashboard/', AdminDashboardView.as_view(), name='admin_dashboard'),
]