from django_filters import rest_framework as filters
from rest_framework import viewsets
from .models import Usuario
from .models import Resenna
from .serializers import ResennaSerializer

class ReseñaFilter(filters.FilterSet):
    class Meta:
        model = Resenna  
        fields = ['usuario', 'clasificacion', 'comentario']



class ReseñaViewSet(viewsets.ModelViewSet):
    queryset = Resenna.objects.all()
    serializer_class = ResennaSerializer
    filter_backends = [filters.DjangoFilterBackend] 
    filterset_class = ReseñaFilter
    
    

