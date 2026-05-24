import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'

export const Publicacion = sequelize.define('Publicacion', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },

  revista: {
    type: DataTypes.STRING
  },

  anio: {
    type: DataTypes.INTEGER
  }
})