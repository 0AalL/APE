import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'

export const Contacto = sequelize.define(
  'Contacto',
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },

    empresa: {
      type: DataTypes.STRING,
      allowNull: true
    },

    correo: {
      type: DataTypes.STRING,
      allowNull: false
    },

    areaInteres: {
      type: DataTypes.ENUM(
        'Información General',
        'Cartera de Actividades',
        'Proyectos I+D+I',
        'Grupos de Investigación',
        'Oferta Tecnológica',
        'Ayudas y Subvenciones',
        'Formación',
        'Otros'
      ),
      allowNull: false
    },

    asunto: {
      type: DataTypes.STRING,
      allowNull: false
    },

    mensaje: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    aceptaPrivacidad: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    tableName: 'contactos'
  }
)