import pytest
from trabajadores.models import Trabajador


@pytest.mark.django_db
def test_trabajador_creation():
    trabajador = Trabajador.objects.create(
        nombre="Juan",
        apellidos="Perez",
        ci=12345678,
        salario=3000,
        puesto="Barbero"
    )
    
    assert trabajador.nombre == "Juan"
    assert trabajador.apellidos == "Perez"
    assert trabajador.ci == 12345678
    assert trabajador.salario == 3000
    assert trabajador.puesto == "Barbero"
