import z from 'zod'

export const registerSchema = z.object({
  nombre: z.string().min(3),

  email: z.email(),

  password: z.string().min(6),

  rol: z.enum([
    'admin',
    'investigador'
  ]).optional()
})

export const loginSchema = z.object({
  email: z.email(),

  password: z.string().min(6)
})