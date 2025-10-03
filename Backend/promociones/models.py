from django.db import models
from servicios.models import Servicio

class Promocion(models.Model):
    nombre = models.CharField(max_length=100,blank=False)
    descripcion = models.TextField(blank=False)
    servicio = models.ForeignKey(Servicio, on_delete=models.CASCADE,blank=False)
    porcientoDesc = models.IntegerField(blank=False)

    def __str__(self):
        return self.nombre 