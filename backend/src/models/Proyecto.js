import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'
export const Proyecto = sequelize.define('Proyecto', {

  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },

  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  objetivos: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: []
  },

  resultados: {
    type: DataTypes.TEXT,
    allowNull: true
  },

}, {
  tableName: 'proyectos',
  timestamps: true
})