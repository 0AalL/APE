import z from 'zod'

export const proyectoSchema = z.object({

  titulo: z.string().min(5, 'El título es muy corto'),

  investigadores: z.array(z.number().int().positive())
    .min(1, 'Debe haber al menos un participante'),

  descripcion: z.string().min(10, 'La descripción es muy corta'),

  objetivos: z.array(z.string().min(1, 'Objetivo vacío'))
    .min(1, 'Debe haber al menos un objetivo'),
  resultados: z.string().optional()

})