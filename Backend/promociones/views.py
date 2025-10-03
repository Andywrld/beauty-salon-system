from django_filters import rest_framework as filters
from rest_framework import viewsets
from .models import Promocion
from .serializers import PromocionSerializer




class PromocionFilter(filters.FilterSet):
    class Meta:
        model = Promocion  
        fields = ['nombre', 'descripcion']

class PromocionViewSet(viewsets.ModelViewSet):
    queryset = Promocion.objects.all()
    serializer_class = PromocionSerializer
    filter_backends = [filters.DjangoFilterBackend]  # Requiere django-filter
    filterset_class = PromocionFilter
    
    def create(self, request, *args, **kwargs):
        print('>> RAW DATA:', request.body)
        print('>> PARSED  :', request.data)
        return super().create(request, *args, **kwargs)


