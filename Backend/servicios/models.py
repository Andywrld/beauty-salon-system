from django.db import models
from datetime import timedelta

class Servicio(models.Model):
    nombre = models.CharField(max_length=100,blank=False,unique=True)                                     #unico
    precio = models.DecimalField(decimal_places=2,max_digits=7,blank=True)
    descripcion = models.TextField(blank=False)  #opcional
    imagen = models.ImageField(upload_to='servicio/', blank=True, null=True)
    duracion= models.DurationField(default=timedelta(hours=1))
    
    def __str__(self):
        return self.nombre 