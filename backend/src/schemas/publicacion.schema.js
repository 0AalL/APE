import z from 'zod'

export const publicacionSchema = z.object({
  titulo: z.string().min(5, 'El título debe tener al menos 5 caracteres'),

  resumen: z.string().min(20, 'El resumen debe tener al menos 20 caracteres'),

  revista: z.string().min(3, 'El nombre de revista debe tener al menos 3 caracteres'),

  doi: z.string().min(5, 'El DOI debe tener al menos 5 caracteres'),

  fechaPublicacion: z.string().refine(
    (date) => !isNaN(Date.parse(date)),
    'Formato de fecha inválido'
  ),

  autores: z.string().min(5, 'Los autores deben tener al menos 5 caracteres'),

  proyectoId: z.number().int().positive('El ID del proyecto debe ser un número positivo')
})

