import pytest
from rest_framework.exceptions import ValidationError
from productos.models import Producto
from productos.serializers import ProductoSerializer
from decimal import Decimal


@pytest.mark.django_db  # Asegura que la prueba interactúe con la base de datos
def test_producto_serializer_valid():
    producto = Producto.objects.create(
        nombre="Producto Test",
        precio=Decimal("99.99"),
        cantidad=10
    )
    
    serializer = ProductoSerializer(producto)
    
    assert serializer.data["nombre"] == "Producto Test"
    assert serializer.data["precio"] == "99.99" 
    assert serializer.data["cantidad"] == 10


def test_producto_serializer_invalid():

    invalid_data = {
        "nombre": "",  
        "precio": "no_numero", 
        "cantidad": -5  
    }
    
    serializer = ProductoSerializer(data=invalid_data)
    
    assert not serializer.is_valid()
    assert "nombre" in serializer.errors
    assert "precio" in serializer.errors
    assert "cantidad" in serializer.errors
