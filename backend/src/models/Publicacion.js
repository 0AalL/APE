
import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'

export const Publicacion = sequelize.define('Publicacion', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },

  resumen: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  revista: {
    type: DataTypes.STRING,
    allowNull: false
  },

  doi: {
    type: DataTypes.STRING
  },

  fechaPublicacion: {
    type: DataTypes.DATE
  },

  autores: {
    type: DataTypes.STRING,
    allowNull: false
  },

  proyectoId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Proyectos',
      key: 'id'
    }
  }
})