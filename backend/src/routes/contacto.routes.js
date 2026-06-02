import { Router } from 'express'

import {
  getAll,
  getById,
  create,
  update,
  remove
} from '../controllers/contacto.controller.js'

import { authRequired } from '../middlewares/auth.middleware.js'

const router = Router()

// 🔒 GET ALL (PROTEGIDO)
router.get(
  '/',
  authRequired,
  getAll
)

// 🔒 GET BY ID (PROTEGIDO)
router.get(
  '/:id',
  authRequired,
  getById
)

// 🔓 CREATE (PÚBLICO)
router.post(
  '/',
  create
)


// 🔒 DELETE (PROTEGIDO)
router.delete(
  '/:id',
  authRequired,
  remove
)

export default router