import pytest

from galeria.models import Foto
from galeria.serializers import FotoSerializer
from django.core.files.uploadedfile import SimpleUploadedFile
from datetime import timedelta

@pytest.mark.django_db
def test_foto_serializer_valid():
    
    image = SimpleUploadedFile(
        name='test_foto.jpg', 
        content=b'fake image content', 
        content_type='image/jpeg'
    )
    
    foto = Foto.objects.create(
        nombre="Foto Test",
        imag=image
    )
    
    serializer = FotoSerializer(foto)
    
    assert serializer.data['nombre'] == "Foto Test"
    assert 'galeria/' in serializer.data['imag']
    assert serializer.data['imag'].endswith('.jpg')
    
@pytest.mark.django_db
def test_foto_serializer_invalid():
    data = {
        'nombre': '',
        'imag': None
    }
    
    serializer = FotoSerializer(data=data)
    
    assert not serializer.is_valid()
    assert 'nombre' in serializer.errors
    assert 'imag' in serializer.errors