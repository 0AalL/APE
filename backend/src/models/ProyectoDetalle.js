import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'

export const ProyectoDetalle = sequelize.define('ProyectoDetalle', {

  investigadorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  proyectoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }

}, {
  tableName: 'proyectos_detalle',
  timestamps: true
})