import multer from 'multer'
import path from 'path'

// 📦 Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads') // carpeta donde se guardan las imágenes
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname)
    cb(null, uniqueName)
  }
})

//  Filtro opcional (solo imágenes)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('Solo se permiten imágenes'), false)
  }
}

export const upload = multer({
  storage,
  fileFilter
})