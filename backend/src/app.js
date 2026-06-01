import express from 'express'
import cors from 'cors'
import path from 'path'

import authRoutes from './routes/auth.routes.js'
import investigadoresRoutes from './routes/investigadores.routes.js'
import proyectosRoutes from './routes/proyectos.routes.js'
import publicacionesRoutes from './routes/publicaciones.routes.js'

const app = express()

app.use(cors())
app.use(express.json())

//  SERVIR IMÁGENES CORRECTO
app.use(
  '/uploads',
  express.static(path.join(process.cwd(), 'src/uploads'))
)

app.use('/api/auth', authRoutes)
app.use('/api/investigadores', investigadoresRoutes)
app.use('/api/proyectos', proyectosRoutes)
app.use('/api/publicaciones', publicacionesRoutes)

export default app