import dotenv from 'dotenv'

import app from './src/app.js'

import { sequelize } from './src/config/db.js'

dotenv.config()

const PORT = process.env.PORT || 3000

async function main () {
  try {
    await sequelize.authenticate()

    console.log('DB PostgreSQL conectada')

    await sequelize.sync()

    app.listen(PORT)

    console.log(`Servidor corriendo en puerto ${PORT}`)
  } catch (error) {
    console.log(error)
  }
}

main()