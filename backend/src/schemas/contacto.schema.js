import { z } from 'zod';

export const contactoSchema = z.object({

  nombre: z
    .string()
    .min(3, 'El nombre es obligatorio y debe tener al menos 3 caracteres'),

  empresa: z
    .string()
    .optional()
    .or(z.literal('')),

  correo: z
    .string()
    .email('Debe ser un correo válido'),

  areaInteres: z.enum([
    'Información General',
    'Cartera de Actividades',
    'Proyectos I+D+I',
    'Grupos de Investigación',
    'Oferta Tecnológica',
    'Ayudas y Subvenciones',
    'Formación',
    'Otros'
  ], {
    required_error: 'Debe seleccionar un área de interés'
  }),

  asunto: z
    .string()
    .min(5, 'El asunto es obligatorio'),

  mensaje: z
    .string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres'),

  aceptaPrivacidad: z
    .boolean()
    .refine(val => val === true, {
      message: 'Debe aceptar la política de privacidad'
    })

});