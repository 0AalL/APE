import { Router } from 'express'

import {
  getPublicaciones,
  getPublicacion,
  createPublicacion,
  updatePublicacion,
  deletePublicacion
} from '../controllers/publicaciones.controller.js'

import { validateSchema } from '../middlewares/validateSchema.js'
import { authRequired } from '../middlewares/auth.middleware.js'
import { isAdmin } from '../middlewares/role.middleware.js'
import { publicacionSchema } from '../schemas/publicacion.schema.js'

const router = Router()

// =========================
// 🔓 RUTAS PÚBLICAS (LECTURA)
// =========================
router.get('/', getPublicaciones)
router.get('/:id', getPublicacion)


// =========================
// 🔐 RUTAS PROTEGIDAS (LOGIN)
// =========================
router.post(
  '/',
  authRequired,
  validateSchema(publicacionSchema),
  createPublicacion
)

router.put(
  '/:id',
  authRequired,
  validateSchema(publicacionSchema),
  updatePublicacion
)


// =========================
// 👑 SOLO ADMIN
// =========================
router.delete(
  '/:id',
  authRequired,
  isAdmin,
  deletePublicacion
)

export default router