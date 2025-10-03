// schema/models.schema.service.ts
import { z } from 'zod';

export const schemaservicio = z.object({
  nombre: z.string().min(3, 'EL nombre debe tener al menos 3 caracteres'),
  precio: z.coerce
    .number({
      invalid_type_error: 'Introduce un precio válido',
    })
    .positive('Introduce un precio válido'),

  descripcion: z.string().max(200, 'No puede exceder a 200 caracteres'),
  imagen: z.instanceof(FileList, { message: 'La imagen es requerida' }),

  duracion: z.enum(['1h']).default('1h'),
});
