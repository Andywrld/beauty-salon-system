from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.hashers import make_password


# Create your models here.
    
class Trabajador(models.Model):

    nombre = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=150)
    ci = models.IntegerField(primary_key=True)                                   #unico
    salario = models.IntegerField()
    puesto = models.CharField(max_length=100)
    
    def __str__(self):
        return self.nombre
    
class Producto(models.Model):

    nombre = models.CharField(max_length=100)                #unico
    precio = models.DecimalField(decimal_places=2,max_digits=7)
    calidad = models.CharField(max_length=60)
    cantidad = models.IntegerField(default=0)
    imag = models.ImageField(upload_to='productos/', blank=True, null=True)

    
    def __str__(self):
        return self.nombre
    
    
class Usuario(models.Model):
    nombre = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=150)
    usuario = models.CharField(max_length=100)                                  #unico
    correo = models.EmailField(null=False)
    telefono = models.IntegerField(null=False)
    password = models.TextField(null=False)
    rol = models.CharField(
        max_length=100,
        default='cliente',  # Valor por defecto
        choices=[('cliente', 'Cliente'), ('admin', 'Admin')]  
    )
    
    def save(self, *args, **kwargs):
        # Verifica si la contraseña NO está encriptada
        if not self.password.startswith('pbkdf2_sha256$'):
            # Encripta la contraseña
            self.password = make_password(self.password)
        super(Usuario, self).save(*args, **kwargs)

    def __str__(self):
        return self.nombre


class Foto(models.Model):

    nombre = models.CharField(max_length=100)
    imag = models.ImageField(upload_to='galeria/', blank=True, null=True)
    
    def __str__(self):
        return self.nombre

    
class Servicio(models.Model):

    nombre = models.CharField(max_length=100)                                     #unico
    precio = models.DecimalField(decimal_places=2,max_digits=7)
    descripcion = models.TextField()
    imag = models.ImageField(upload_to='servicio/', blank=True, null=True)
    
    def __str__(self):
        return self.nombre

class Cita(models.Model):
    usuarioid = models.ForeignKey(Usuario, on_delete=models.CASCADE, default=1)
    servicioid = models.ForeignKey(Servicio, on_delete=models.CASCADE)
    comentario = models.TextField(default='')
    fecha = models.DateTimeField()
    
    def __str__(self):
        return self.fecha.strftime("%Y-%m-%d %H:%M")

        
class Promocion(models.Model):
          
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    servicio = models.ForeignKey(Servicio, on_delete=models.CASCADE)
    porcientoDesc = models.IntegerField()

    def __str__(self):
        return self.nombre
    
class Reseña(models.Model):
    usuarioid = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    clasificacion = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    comentario = models.TextField()

    def __str__(self):
        return f"Reseña de {self.usuarioid.nombre} - {self.clasificacion}★"
   

