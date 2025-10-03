from rest_framework import serializers
from .models import Producto
from rest_framework.validators import UniqueValidator

class ProductoSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Producto
        fields = '__all__'


    def validate_precio(self, value):
        if value <= 0:
            raise serializers.ValidationError("El valor debe ser mayor que cero.")
        return value
    
    
    
    def validate_cantidad(self, value):
        if value < 0:
            raise serializers.ValidationError("La cantidad no puede ser negativa.")
        return value
    
  