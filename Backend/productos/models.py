from django.db import models

class Producto(models.Model):
    nombre = models.CharField(max_length=100,unique=True)                #unico
    precio = models.DecimalField(decimal_places=2,max_digits=7)
    cantidad = models.IntegerField(default=0)

    def __str__(self):
        return self.nombre 