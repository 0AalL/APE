import { Router } from 'express'

import {
  getInvestigadores,
  getInvestigadorById,
  createInvestigador,
  updateInvestigador,
  deleteInvestigador
} from '../controllers/investigadores.controller.js'

import { validateSchema } from '../middlewares/validateSchema.js'
import { authRequired } from '../middlewares/auth.middleware.js'

import { investigadorSchema } from '../schemas/investigador.schema.js'

// 📸 MULTER
import { upload } from '../middlewares/upload.js'

const router = Router()

// 📥 GET ALL
router.get(
  '/',
  authRequired,
  getInvestigadores
)

// 📥 GET BY ID
router.get(
  '/:id',
  authRequired,
  getInvestigadorById
)

// ➕ CREATE CON FOTO
router.post(
  '/',
  authRequired,
  upload.single('foto'),   // AQUÍ SE AGREGA MULTER
  validateSchema(investigadorSchema),
  createInvestigador
)

// ✏️ UPDATE CON FOTO
router.put(
  '/:id',
  authRequired,
  upload.single('foto'),   //  AQUÍ TAMBIÉN
  validateSchema(investigadorSchema),
  updateInvestigador
)

// 🗑 DELETE
router.delete(
  '/:id',
  authRequired,
  deleteInvestigador
)

export default router