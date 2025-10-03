import pytest
from servicios.models import Servicio
from django.core.files.uploadedfile import SimpleUploadedFile
from datetime import timedelta
@pytest.mark.django_db 
def test_create_servicio():
        image = SimpleUploadedFile(
        name='test_image.jpg', 
        content=b'fake image content', 
        content_type='image/jpeg'
    )
    
        servicio = Servicio.objects.create(
            nombre='Pedicura',
            precio=24,
            descripcion='Aqui recibes buena pedicura',
            imagen=image,
            duracion=timedelta(hours=1)
    )
    
        assert servicio.nombre == 'Pedicura'
        assert servicio.descripcion=='Aqui recibes buena pedicura'
        assert servicio.imagen.name.startswith('servicio/')  
        assert 'test_image' in servicio.imagen.name
        assert servicio.imagen.name.endswith('.jpg')
        assert servicio.precio == 24
        assert servicio.duracion == timedelta(hours=1)