import pytest
from usuarios.models import Usuario

@pytest.mark.django_db
def test_usuario_creation():
    usuario = Usuario.objects.create(
        nombre="testnombre",
        apellidos="testapellidos",
        usuario="testusuario",
        correo="testcorreo@gmail.com",
        telefono=56870848,
        password="testpassword",
        rol="cliente"  # O "admin", según sea necesario
        )
    
    assert usuario.nombre == "testnombre"
    assert usuario.apellidos == "testapellidos"
    assert usuario.usuario == "testusuario"
    assert usuario.correo == "testcorreo@gmail.com"
    assert usuario.telefono == 56870848
    assert usuario.rol == "cliente"
    

