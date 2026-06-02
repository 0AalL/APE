import { Router } from 'express'

import {
  getInvestigadores,
  getInvestigadorById,
  createInvestigador,
  updateInvestigador,
  deleteInvestigador,
  getInvestigadorDetalles
} from '../controllers/investigadores.controller.js'

import { validateSchema } from '../middlewares/validateSchema.js'
import { authRequired } from '../middlewares/auth.middleware.js'

import { investigadorSchema } from '../schemas/investigador.schema.js'

// 📸 MULTER
import { upload } from '../middlewares/upload.js'

const router = Router()

// 🔓 GET ALL (PÚBLICO)
router.get('/', getInvestigadores)

// 🔓 GET DETALLES (PÚBLICO)
router.get('/:id/detalles', getInvestigadorDetalles)

// 🔓 GET BY ID (PÚBLICO) ✅
router.get('/:id', getInvestigadorById)


// 🔒 CREATE
router.post(
  '/',
  authRequired,
  upload.single('foto'),
  validateSchema(investigadorSchema),
  createInvestigador
)

// 🔒 UPDATE
router.put(
  '/:id',
  authRequired,
  upload.single('foto'),
  validateSchema(investigadorSchema),
  updateInvestigador
)

// 🔒 DELETE
router.delete(
  '/:id',
  authRequired,
  deleteInvestigador
)

export default router