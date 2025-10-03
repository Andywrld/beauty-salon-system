import { z } from 'zod';
export const productoSchema = z.object({
  nombre: z.string(),
  precio: z.coerce
    .number({
      invalid_type_error: 'Introduce un precio válido ',
    })
    .positive('Introduce un precio válido'),
  cantidad: z.coerce
    .number({
      invalid_type_error: 'Introduce una cantidad  válida',
    })
    .positive('Introduce un cantidad  válida'),
});
