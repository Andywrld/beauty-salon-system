import pytest
from decimal import Decimal
from productos.models import Producto


@pytest.mark.django_db
def test_producto_creation():
    producto = Producto.objects.create(
        nombre="Producto Test",
        precio=Decimal("99.99"),
        cantidad=10
    )
    
    assert producto.nombre == "Producto Test"
    assert producto.precio == Decimal("99.99")
    assert producto.cantidad == 10
    assert str(producto) == "Producto Test"  
