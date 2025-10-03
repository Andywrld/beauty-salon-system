from usuarios.models import Usuario
from usuarios.serializers import UsuarioSerializer
import pytest
from django.db import IntegrityError


@pytest.mark.django_db 
def test_usuario_serializer_valid():
    usuario = Usuario.objects.create(
        nombre="testnombre",
        apellidos="testapellidos",
        usuario="testusuario",
        correo="testcorreo@gmail.com",
        telefono=56870848,
        password="testpassword",
        rol="cliente"  
        )
    
    serializer = UsuarioSerializer(usuario)
    assert serializer.data["nombre"] == "testnombre"
    assert serializer.data["apellidos"] == "testapellidos"
    assert serializer.data["usuario"] == "testusuario"
    assert serializer.data["correo"] == "testcorreo@gmail.com"
    assert serializer.data["telefono"] == 56870848
    assert serializer.data["rol"] == "cliente"
    
@pytest.mark.django_db   
def test_user_invalid():
        invalid_data = {
        "nombre": "",  
        "apellidos": "",
        "usuario": "1221",
        "correo": "not_an_email",  
        "telefono": -12345678,  
        
        "rol": "invalido_rol"  
    }
    
        serializer = UsuarioSerializer(data=invalid_data)
        assert not serializer.is_valid()
        assert "nombre" in serializer.errors
        assert "apellidos" in serializer.errors
        assert "usuario" in serializer.errors
        assert "correo" in serializer.errors
        assert "telefono" in serializer.errors
        assert "rol" in serializer.errors
    








    
    
    