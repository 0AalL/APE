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
 * PROYECTO → PUBLICACIÓN (ONE TO MANY)
 * ======================================
 */

Proyecto.hasMany(Publicacion, {
  foreignKey: 'proyectoId',
  as: 'publicaciones'
})

Publicacion.belongsTo(Proyecto, {
  foreignKey: 'proyectoId',
  as: 'proyecto'
})

export {
  Investigador,
  Proyecto,
  Publicacion,
  ProyectoDetalle
}