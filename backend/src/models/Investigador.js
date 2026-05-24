import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'

export const Investigador = sequelize.define('Investigador', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },

  especialidad: {
    type: DataTypes.STRING,
    allowNull: false
  },

  email: {
    type: DataTypes.STRING,
    unique: true
  }
})