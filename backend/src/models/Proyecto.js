import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'

export const Proyecto = sequelize.define('Proyecto', {

  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },

  participantes: {
    type: DataTypes.TEXT,
    allowNull: false,
    get() {
      const raw = this.getDataValue('participantes')
      return raw ? JSON.parse(raw) : []
    },
    set(value) {
      this.setDataValue('participantes', JSON.stringify(value))
    }
  },

  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  objetivos: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  resultados: {
    type: DataTypes.TEXT,
    allowNull: true
  }

}, {
  tableName: 'proyectos',
  timestamps: true
})