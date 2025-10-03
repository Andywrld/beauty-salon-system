from django.db import models
from django.contrib.auth.hashers import make_password

class Usuario(models.Model):
    nombre = models.CharField(max_length=100,blank=False)                
    apellidos = models.CharField(max_length=150,blank=False)  
    usuario = models.CharField(max_length=100,unique=True)                                
    correo = models.EmailField(null=False,blank=False,unique=True)  
    telefono = models.IntegerField(null=False,blank=False)  
    password = models.TextField(null=False,blank=False)  
    rol = models.CharField(
        max_length=100,
        default='cliente',
        choices=[('cliente', 'Cliente'), ('admin', 'Admin')]  
    )
    
    def save(self, *args, **kwargs):
        
        if not self.password.startswith('pbkdf2_sha256$'):
            self.password = make_password(self.password)
        super(Usuario, self).save(*args, **kwargs)

    def __str__(self):
        return self.nombre 