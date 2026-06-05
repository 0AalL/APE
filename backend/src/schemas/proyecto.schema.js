import z from 'zod'

export const proyectoSchema = z.object({

  titulo: z.string().min(5, 'El título debe tener al menos 5 caracteres'),

  investigadores: z.array(z.number().int().positive('Los IDs deben ser positivos'))
    .min(1, 'Debe haber al menos un investigador'),

  descripcion: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),

  objetivos: z.array(z.string().min(1, 'El objetivo no puede estar vacío'))
    .min(1, 'Debe haber al menos un objetivo'),

  resultados: z.string().optional()

})