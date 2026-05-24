import { DataTypes } from 'sequelize'

import { sequelize } from '../config/db.js'

export const Usuario = sequelize.define(
  'Usuario',
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    rol: {
      type: DataTypes.ENUM(
        'admin',
        'investigador'
      ),
      defaultValue: 'investigador'
    }
  }
)