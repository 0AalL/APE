
import z from 'zod'

export const proyectoSchema = z.object({
  titulo: z.string().min(5),

  descripcion: z.string().min(10),

  presupuesto: z.number().positive(),

  fechaInicio: z.string(),

  fechaFin: z.string(),

  estado: z.enum([
    'activo',
    'finalizado',
    'pausado'
  ]),

  investigadorId: z.number()
})