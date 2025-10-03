from django.db import models
from django.core.exceptions import ValidationError
from django.utils import timezone

from usuarios.models import Usuario
from servicios.models import Servicio

class Cita(models.Model):
  
    service = models.ForeignKey(
        Servicio,
        on_delete=models.CASCADE,
        help_text="Servicio reservado"
    )
    customer = models.ForeignKey(
        Usuario,
        on_delete=models.CASCADE,
        help_text="Usuario que reservó la cita"
    )
    start = models.DateTimeField(
        help_text="Fecha y hora de inicio de la cita",
        null=True,
        
    )
    end = models.DateTimeField(
        editable=False,
        help_text="Fecha y hora de fin calculada automáticamente",
        null=True,
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        help_text="Marca de tiempo cuando se creó la cita",
        null=True,
    )
    


    class Meta:
        unique_together = ('service', 'start')
        ordering = ['-start']

    def clean(self):
        # Validaciones antes de guardar
        if not self.start:
            raise ValidationError('La fecha/hora de inicio es requerida.')
        if self.start < timezone.now():
            raise ValidationError('No se puede reservar en fechas/horas pasadas.')

    def save(self, *args, **kwargs):
        # Ejecuta validaciones
        self.full_clean()
       
        self.end = self.start + self.service.duracion
        super().save(*args, **kwargs)

    def __str__(self):
        nombre_cliente = getattr(self.customer, 'nombre', None) or str(self.customer)
        return (
            f"{nombre_cliente} - {self.service.nombre} "
            f"@ {self.start.strftime('%Y-%m-%d %H:%M')}"
        )
