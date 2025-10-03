import { z } from 'zod';

export const schemapromociones = z.object({
  nombre: z.string().min(3,'EL nombre debe tener al menos 3 caracteres '),
  descripcion: z.string().max(100,'Debe tener máximo 100 caracteres'),
  porcientoDesc: z.coerce
    .number()
    .positive('Introduce un porciento de descuento validó'),

  servicio_id: z.coerce.number(),
});
