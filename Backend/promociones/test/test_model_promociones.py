import pytest
from promociones.models import Promocion
from servicios.models import Servicio
from datetime import timedelta

@pytest.mark.django_db 
def test_promocion_creation():
    servicio = Servicio.objects.create(nombre="Barberia",precio=20,descripcion='Aqui hacemos lo mejor ', duracion=timedelta(hours=1) )
    promocion= Promocion.objects.create(
        nombre='Black Friday',
        descripcion='Viernes negro',
        servicio = servicio,
        porcientoDesc=40
    )
    
    
    assert promocion.nombre=='Black Friday'
    assert promocion.descripcion=='Viernes negro'
    assert promocion.servicio == servicio
    assert promocion.porcientoDesc == 40