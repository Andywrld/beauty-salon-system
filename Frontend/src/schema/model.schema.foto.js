import { z } from 'zod';

export const schemafoto = z.object({
  nombre: z.string().min('EL nombre debe tener al menos 3 caracteres'),
  imag: z.instanceof(FileList, { message: 'La imagen es requerida' }),
});
