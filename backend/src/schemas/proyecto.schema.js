import z from 'zod'

export const proyectoSchema = z.object({

  titulo: z.string().min(5, 'El título es muy corto'),

  participantes: z.array(z.string().min(2)).min(1, 'Debe haber al menos un participante'),

  descripcion: z.string().min(10, 'La descripción es muy corta'),

  objetivos: z.string().min(10, 'Los objetivos son obligatorios'),

  resultados: z.string().optional()

})