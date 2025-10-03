import pytest
from servicios.models import Servicio
from servicios.serializers import ServicioSerializer
from django.core.files.uploadedfile import SimpleUploadedFile
from datetime import timedelta
@pytest.mark.django_db

def test_servicio_serializer_valid():

        image = SimpleUploadedFile(
        name='test_image.jpg', 
        content=b'fake image content', 
        content_type='image/jpeg'
    )
    
        servicio = Servicio.objects.create(
        
        nombre="Corte de cabello",
        precio=15.00,
        descripcion="Corte de cabello moderno",
        duracion=timedelta(hours=1),
        imagen=image
    )
        
        serializer = ServicioSerializer(servicio)
        
        assert serializer.data['nombre'] == "Corte de cabello"
        assert serializer.data['precio'] == "15.00"
        assert serializer.data['descripcion'] == "Corte de cabello moderno"
        assert str(serializer.data['duracion']) == "01:00:00"
        assert 'servicio/' in serializer.data['imagen']
        assert serializer.data['imagen'].endswith('.jpg')
        
@pytest.mark.django_db
def test_servicio_serializer_invalid():
    
    data = {
        'nombre': '',
        'precio': -10.00,
        'descripcion': '',
        'duracion': timedelta(hours=1),
        'imagen': None
    }
    
    serializer = ServicioSerializer(data=data)
    
    assert not serializer.is_valid()
    assert 'nombre' in serializer.errors
    assert 'precio' in serializer.errors
    assert 'descripcion' in serializer.errors
    assert 'imagen' in serializer.errors
        