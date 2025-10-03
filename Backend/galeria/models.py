from django.db import models
from django.core.validators import FileExtensionValidator

class Foto(models.Model):
    nombre = models.CharField(max_length=100,blank=False)  # Nombre de la foto
    imag = models.ImageField(upload_to='galeria/',validators=[FileExtensionValidator(allowed_extensions=['jpg','jpeg','png','webp'])] , blank=True, null=True)
    
  

    
    def __str__(self):
        return self.nombre
    
    class Meta:
        verbose_name = 'Foto'
        verbose_name_plural = 'Fotos' 