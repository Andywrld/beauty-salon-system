from django_filters import rest_framework as filters
from rest_framework import viewsets
from .models import Producto
from .serializers import ProductoSerializer
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


# Create your views here.
class ProductoFilter(filters.FilterSet):
    class Meta:
        model = Producto  
        fields = ['nombre', 'precio', 'cantidad']


class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    filter_backends = [filters.DjangoFilterBackend]  # Requiere django-filter
    filterset_class = ProductoFilter
    
    
class ProductoView(APIView):
    permission_classes = [AllowAny]
        
    def post (self, request):
        serializer = ProductoSerializer(data=request.data)

        if(Producto.objects.filter(nombre=request.data.get('nombre')).exists()):
            return Response({"nombre": "Este producto ya existe"}, status=400)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
    
    

