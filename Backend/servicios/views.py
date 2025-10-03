from django_filters import rest_framework as filters
from rest_framework import viewsets
from .models import Servicio
from .serializers import ServicioSerializer

class ServicioFilter(filters.FilterSet):
    class Meta:
        model = Servicio  
        fields = ['nombre', 'precio', 'descripcion']

class ServicioViewSet(viewsets.ModelViewSet):
    queryset = Servicio.objects.all()
    serializer_class = ServicioSerializer
    filter_backends = [filters.DjangoFilterBackend]  # Requiere django-filter
    filterset_class = ServicioFilter

