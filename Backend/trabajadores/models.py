from django.db import models

class Trabajador(models.Model):
    nombre = models.CharField(max_length=100,blank=False)                #unico
    apellidos = models.CharField(max_length=150,blank=False)  
    ci = models.CharField(primary_key=True)                                   #unico
    salario = models.IntegerField(blank=False)  
    puesto = models.CharField(max_length=100,blank=False)
    
    def __str__(self):
        return self.nombre 
    
    