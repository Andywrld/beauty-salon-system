from django.contrib import admin
from .models import Producto
from .models import Cita
from .models import Usuario
from .models import Foto
from .models import Promocion
from .models import Reseña
from .models import Servicio
from .models import Trabajador

# Register your models here.

admin.site.register(Producto)
admin.site.register(Cita)
admin.site.register(Usuario)
admin.site.register(Foto)
admin.site.register(Promocion)
admin.site.register(Reseña)
admin.site.register(Servicio)
admin.site.register(Trabajador)

