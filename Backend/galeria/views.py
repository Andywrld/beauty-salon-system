from django_filters import rest_framework as filters
from rest_framework import viewsets
from .models import Foto
from .serializers import FotoSerializer




class FotoFilter(filters.FilterSet):
    class Meta:
        model = Foto 
        fields = ['nombre']


class FotoViewSet(viewsets.ModelViewSet):
    queryset = Foto.objects.all()
    serializer_class = FotoSerializer
    # permission_classes = [IsAuthenticated]
    filter_backends = [filters.DjangoFilterBackend]  # Requiere django-filter
    filterset_class = FotoFilter