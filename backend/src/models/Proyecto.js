import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'

export const Proyecto = sequelize.define('Proyecto', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },

  descripcion: {
    type: DataTypes.TEXT
  },

  estado: {
    type: DataTypes.STRING,
    defaultValue: 'activo'
  }
})