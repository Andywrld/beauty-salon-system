import pytest
from django.db import IntegrityError
from usuarios.models import Usuario

@pytest.mark.django_db
def test_no_se_puede_crear_usuario_con_mismo_usuario():

    username_comun = "usuario_repetido"
    apellidos='torres'
    telefono=56870848
    password = "FisyNaruto123"
    

    
    usuario1 = Usuario.objects.create(usuario=username_comun, correo="email1@example.com", password=password,apellidos=apellidos,telefono=telefono)
    assert usuario1.id is not None 

   
    with pytest.raises(IntegrityError):
        Usuario.objects.create(usuario=username_comun, correo="email2@example.com", password=password,apellidos=apellidos,telefono=telefono)
        