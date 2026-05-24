import z from 'zod'

export const investigadorSchema = z.object({
  nombre: z.string().min(3),

  especialidad: z.string().min(3),

  email: z.email()
})