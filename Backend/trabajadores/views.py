from django_filters import rest_framework as filters
from rest_framework import viewsets
from .models import Trabajador
from .serializers import TrabajadorSerializer



class TrabajadorFilter(filters.FilterSet):
    class Meta:
        model = Trabajador  
        fields = ['nombre', 'apellidos', 'ci','salario', 'puesto']

class TrabajadorViewSet(viewsets.ModelViewSet):
    queryset = Trabajador.objects.all()
    serializer_class = TrabajadorSerializer
    filter_backends = [filters.DjangoFilterBackend]  # Requiere django-filter
    filterset_class = TrabajadorFilter

