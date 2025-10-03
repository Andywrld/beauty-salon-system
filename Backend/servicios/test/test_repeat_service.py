import pytest
from django.db import IntegrityError
from  servicios.models import Servicio
from django.core.files.uploadedfile import SimpleUploadedFile
from datetime import timedelta



@pytest.mark.django_db
def test_no_se_puede_crear_servicio_repetico():
    
    image = SimpleUploadedFile(
        name='test_image.jpg', 
        content=b'fake image content', 
        content_type='image/jpeg'
    )

    nombre_repetido = "Barberia"
    precio=12.99
    descripcion='Esto es una descripcionn',
    imagen=image
    duracion=timedelta(hours=1)
  
    producto1 = Servicio.objects.create(nombre=nombre_repetido, precio=precio, descripcion=descripcion,imagen=imagen,duracion=duracion)
    assert producto1.id is not None 

   
    with pytest.raises(IntegrityError):
       Servicio.objects.create(nombre=nombre_repetido, precio=precio, descripcion=descripcion,imagen=imagen,duracion=duracion)
        