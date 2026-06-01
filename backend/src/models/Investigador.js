import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'

export const Investigador = sequelize.define('Investigador', {

  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },

  cargo: {
    type: DataTypes.STRING,
    allowNull: false
  },

  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  orcid: {
    type: DataTypes.STRING
  },

  facebook: {
    type: DataTypes.STRING
  },

  linkedin: {
    type: DataTypes.STRING
  },

  instagram: {
    type: DataTypes.STRING
  },

  telegram: {
    type: DataTypes.STRING
  },

  foto: {
    type: DataTypes.STRING,
    allowNull: true
  },
  biografia: {
    type: DataTypes.TEXT
  }

})