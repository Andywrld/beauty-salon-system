import pytest

from galeria.models import Foto
from django.core.files.uploadedfile import SimpleUploadedFile

@pytest.mark.django_db
def test_foto_creation():
    
    image = SimpleUploadedFile(
        name='test_foto.jpg', 
        content=b'fake image content', 
        content_type='image/jpeg'
    )
    
    foto = Foto.objects.create(
        nombre="Foto Test",
        imag=image 
    )
    
    assert 'test_foto' in foto.imag.name  # Just check if the base filename is in the path
    assert foto.nombre == "Foto Test"
