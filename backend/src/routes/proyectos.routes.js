import { Router } from 'express'

import {
  getProyectos,
  getProyecto,
  createProyecto,
  updateProyecto,
  deleteProyecto,
  getProyectoDetalles

} from '../controllers/proyectos.controller.js'

import { validateSchema } from '../middlewares/validateSchema.js'

import { authRequired }
  from '../middlewares/auth.middleware.js'

import { isAdmin }
  from '../middlewares/role.middleware.js'

import { proyectoSchema }
  from '../schemas/proyecto.schema.js'

const router = Router()

// TODAS las rutas protegidas
router.use(authRequired)

// Obtener proyectos
router.get('/', getProyectos)

router.get('/:id/detalles', getProyectoDetalles)

// Obtener proyecto por ID
router.get('/:id', getProyecto)

// Crear proyecto
router.post(
  '/',
  validateSchema(proyectoSchema),
  createProyecto
)

// Actualizar proyecto
router.put(
  '/:id',
  validateSchema(proyectoSchema),
  updateProyecto
)

// Eliminar proyecto (solo admin)
router.delete(
  '/:id',
  isAdmin,
  deleteProyecto
)

export default router