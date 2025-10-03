from trabajadores.models import Trabajador
from trabajadores.serializers import TrabajadorSerializer
import pytest



@pytest.mark.django_db
def test_trabajador_serializer_valid():
    trabajador = Trabajador.objects.create(
        nombre="testnombre",
        apellidos="testapellidos",
        ci='02070466305',
        salario=3000,
        puesto="Barbero"
    )
    
    serializer = TrabajadorSerializer(trabajador)
    assert serializer.data["nombre"] == "testnombre"
    assert serializer.data["apellidos"] == "testapellidos"
    assert serializer.data["ci"] == '02070466305'
    assert serializer.data["salario"] == 3000
    assert serializer.data["puesto"] == "Barbero"
    
@pytest.mark.django_db
def test_trabajador_serializer_invalid():
    invalid_data = {
        "nombre": "",  
        "apellidos": "",
        "ci": "no_numero",  
        "salario": -3000,  
        "puesto": ""  
    }
    
    serializer = TrabajadorSerializer(data=invalid_data)
    assert not serializer.is_valid()
    assert "nombre" in serializer.errors
    assert "apellidos" in serializer.errors
    assert "ci" in serializer.errors
    assert "salario" in serializer.errors
    assert "puesto" in serializer.errors