import pytest
from resennas.models import Resenna
from usuarios.models import Usuario

@pytest.fixture
def user(db):
    return Usuario.objects.create(
        nombre="Ana",
        apellidos="Pérez",
        usuario="ana123",
        correo="ana@example.com",
        telefono=5551234,
        password="foo",
    )

@pytest.mark.django_db
def test_validator_create_r(user):
    resenna = Resenna.objects.create(
        usuario=user,
        clasificacion=5,
        comentario='The best in the world'
    )
    assert resenna.usuario == user
    assert resenna.clasificacion == 5
    assert resenna.comentario == 'The best in the world'
