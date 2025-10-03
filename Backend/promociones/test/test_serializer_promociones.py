import pytest
from promociones.models import Promocion
from promociones.serializers import PromocionSerializer
from servicios.models import Servicio
from datetime import timedelta

@pytest.mark.django_db

def test_promociones_serializer():
    
    servicio = Servicio.objects.create(nombre="Barberia",precio=20,descripcion='Aqui hacemos lo mejor ', duracion=timedelta(hours=1) )
        
    promocion= Promocion.objects.create(
        nombre='Black Friday',
        descripcion='Viernes negro',
        servicio = servicio,
        porcientoDesc=40
    )
     
    
    serializer = PromocionSerializer(promocion)
    assert serializer.data["nombre"]=='Black Friday'
    assert serializer.data['descripcion']=='Viernes negro'
    assert serializer.data['porcientoDesc']==40
  

    
    