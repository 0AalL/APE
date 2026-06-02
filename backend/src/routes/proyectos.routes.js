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
import { authRequired } from '../middlewares/auth.middleware.js'
import { isAdmin } from '../middlewares/role.middleware.js'

import { proyectoSchema } from '../schemas/proyecto.schema.js'

const router = Router()

// 🔓 LECTURA (PÚBLICO)

// Obtener todos los proyectos
router.get('/', getProyectos)

// Detalles
router.get('/:id/detalles', getProyectoDetalles)

// Obtener proyecto por ID
router.get('/:id', getProyecto)


// 🔒 CREAR (PROTEGIDO)
router.post(
  '/',
  authRequired,
  validateSchema(proyectoSchema),
  createProyecto
)


// 🔒 ACTUALIZAR (PROTEGIDO)
router.put(
  '/:id',
  authRequired,
  validateSchema(proyectoSchema),
  updateProyecto
)


// 🔒 ELIMINAR (SOLO ADMIN)
router.delete(
  '/:id',
  authRequired,
  isAdmin,
  deleteProyecto
)

export default router