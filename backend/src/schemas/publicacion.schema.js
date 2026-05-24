import z from 'zod'

export const publicacionSchema = z.object({
  titulo: z.string().min(5),

  resumen: z.string().min(20),

  revista: z.string().min(3),

  doi: z.string().min(5),

  fechaPublicacion: z.string(),

  autores: z.string().min(5),

  proyectoId: z.number()
})

