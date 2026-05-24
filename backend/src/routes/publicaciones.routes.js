import { Router } from 'express'

import {
  getPublicaciones,
  getPublicacion,
  createPublicacion,
  updatePublicacion,
  deletePublicacion
} from '../controllers/publicaciones.controller.js'

import { validateSchema } from '../middlewares/validateSchema.js'

import { authRequired }
from '../middlewares/auth.middleware.js'

import { isAdmin }
from '../middlewares/role.middleware.js'

import { publicacionSchema }
from '../schemas/publicacion.schema.js'

const router = Router()

// TODAS las rutas protegidas
router.use(authRequired)

// Obtener publicaciones
router.get('/', getPublicaciones)

// Obtener publicación por ID
router.get('/:id', getPublicacion)

// Crear publicación
router.post(
  '/',
  validateSchema(publicacionSchema),
  createPublicacion
)

// Actualizar publicación
router.put(
  '/:id',
  validateSchema(publicacionSchema),
  updatePublicacion
)

// Eliminar publicación (solo admin)
router.delete(
  '/:id',
  isAdmin,
  deletePublicacion
)

export default router