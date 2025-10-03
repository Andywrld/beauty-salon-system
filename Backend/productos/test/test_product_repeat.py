import pytest
from django.db import IntegrityError
from productos.models import Producto

@pytest.mark.django_db
def test_no_se_puede_crear_producto_con_mismo_nombre():

    nombre_repetido = "Keratina"
    precio=12.99
    cantidad=100
  
    producto1 = Producto.objects.create(nombre=nombre_repetido, precio=precio, cantidad=cantidad)
    assert producto1.id is not None 

   
    with pytest.raises(IntegrityError):
        Producto.objects.create(nombre=nombre_repetido, precio=precio, cantidad=cantidad)
        