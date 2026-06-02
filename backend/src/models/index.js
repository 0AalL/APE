import { Investigador } from './Investigador.js'
import { Proyecto } from './Proyecto.js'
import { Publicacion } from './Publicacion.js'
import { ProyectoDetalle } from './ProyectoDetalle.js'

/**
 * ======================================
 * INVESTIGADOR ↔ PROYECTO (MANY TO MANY)
 * ======================================
 */

Investigador.belongsToMany(Proyecto, {
  through: ProyectoDetalle,
  foreignKey: 'investigadorId',
  otherKey: 'proyectoId',
  as: 'proyectos'
})

Proyecto.belongsToMany(Investigador, {
  through: ProyectoDetalle,
  foreignKey: 'proyectoId',
  otherKey: 'investigadorId',
  as: 'investigadores'
})

/**
 * ======================================
 * PROYECTO → PUBLICACION (ONE TO MANY)
 * ======================================
 */

// Un proyecto tiene muchas publicaciones
Proyecto.hasMany(Publicacion, {
  foreignKey: 'proyectoId',
  as: 'publicaciones'
})

// Una publicación pertenece a un proyecto
Publicacion.belongsTo(Proyecto, {
  foreignKey: 'proyectoId',
  as: 'proyecto'
})

/**
 * ======================================
 * EXPORTS
 * ======================================
 */

export {
  Investigador,
  Proyecto,
  Publicacion,
  ProyectoDetalle
}