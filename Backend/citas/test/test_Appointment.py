import pytest
from django.utils import timezone
from django.core.exceptions import ValidationError
from rest_framework.exceptions import ValidationError as SerializerValidationError
from datetime import timedelta

from citas.serializers import AppointmentSerializer
from citas.models import Cita
from servicios.models import Servicio
from usuarios.models import Usuario

@pytest.fixture
def service(db):
    
    return Servicio.objects.create(
        nombre="Corte de cabello",
        duracion=timedelta(hours=1),
        precio=25
    )

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
class TestAppointmentSerializer:

    def test_serializer_valido_crea_cita(self, service, user):
        """Debe crear correctamente una cita futura."""
        start = timezone.now() + timedelta(days=1)
        data = {
            "service": service.pk,
            "customer": user.pk,
            "start": start.isoformat()
        }
        ser = AppointmentSerializer(data=data)
        assert ser.is_valid(), ser.errors
        cita = ser.save()
        
        assert cita.end == cita.start + service.duracion

    def test_serializer_error_fecha_pasada(self, service, user):
        """No permite una fecha de inicio en el pasado."""
        pasado = timezone.now() - timedelta(hours=2)
        data = {"service": service.pk, "customer": user.pk, "start": pasado.isoformat()}
        ser = AppointmentSerializer(data=data)
        with pytest.raises(SerializerValidationError) as exc:
            ser.is_valid(raise_exception=True)
        assert "pasadas" in str(exc.value)

    def test_serializer_unique_service_start(self, service, user):
        """Si ya existe cita para ese servicio y hora, lanza error."""
        start = timezone.now() + timedelta(days=2)

        Cita.objects.create(service=service, customer=user, start=start)
       
        data = {"service": service.pk, "customer": user.pk, "start": start.isoformat()}
        ser = AppointmentSerializer(data=data)
     
        assert not  ser.is_valid(), ser.errors
        
        assert ser.errors['non_field_errors'] == [
        "Ese servicio ya está reservado a esa hora. Elige otra fecha."
    ]
       


@pytest.mark.django_db
class TestCitaModel:

    def test_clean_requiere_start(self, service, user):
        """El método clean  rechaza si falta start"""
        cita = Cita(service=service, customer=user, start=None)
        with pytest.raises(ValidationError) as exc:
            cita.full_clean()
        assert "inicio es requerida" in str(exc.value)

    def test_clean_rechaza_fecha_pasada(self, service, user):
        """No permite start en el pasado al full_clean()."""
        cita = Cita(
            service=service,
            customer=user,
            start=timezone.now() - timedelta(days=1)
        )
        with pytest.raises(ValidationError) as exc:
            cita.full_clean()
        assert "pasadas" in str(exc.value)

    def test_save_calcula_end(self, service, user):
        """El save() debe calcular el campo end automáticamente."""
        inicio = timezone.now() + timedelta(hours=3)
        cita = Cita(service=service, customer=user, start=inicio)
      
        cita.save()
        assert cita.end == inicio + service.duracion

    def test_unique_together_en_modelo(self, service, user):
        """La restricción única en DB impide duplicados a nivel de modelo."""
        inicio = timezone.now() + timedelta(days=3)
        Cita.objects.create(service=service, customer=user, start=inicio)
       
        cita2 = Cita(service=service, customer=user, start=inicio)
        with pytest.raises(Exception):
            
            cita2.save()
