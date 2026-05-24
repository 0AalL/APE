import { Router } from 'express'

import {
  getInvestigadores,
  createInvestigador
} from '../controllers/investigadores.controller.js'

import { validateSchema } from '../middlewares/validateSchema.js'

import { authRequired }
from '../middlewares/auth.middleware.js'

import { investigadorSchema }
from '../schemas/investigador.schema.js'

const router = Router()

// GET protegido
router.get(
  '/',
  authRequired,
  getInvestigadores
)

// POST protegido
router.post(
  '/',
  authRequired,
  validateSchema(investigadorSchema),
  createInvestigador
)

export default router