from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from usuarios.models import Usuario

class Resenna(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    clasificacion = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    comentario = models.TextField()

    def __str__(self):
        return f"Reseña de {self.usuario.nombre} - {self.clasificacion}★" 