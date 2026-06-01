import { z } from 'zod'

export const investigadorSchema = z.object({

  nombre: z.string().min(3),
  cargo: z.string().min(2),
  correo: z.email(),

  orcid: z.string().url().optional().or(z.literal('')),

  facebook: z.string().optional().or(z.literal('')),
  linkedin: z.string().optional().or(z.literal('')),
  instagram: z.string().optional().or(z.literal('')),
  telegram: z.string().optional().or(z.literal('')),

  foto: z.string().optional().or(z.literal('')),

  biografia: z.string().min(10).optional().or(z.literal(''))
})