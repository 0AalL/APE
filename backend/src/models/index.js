import { Investigador } from './Investigador.js'
import { Proyecto } from './Proyecto.js'
import { Publicacion } from './Publicacion.js'

Investigador.hasMany(Proyecto, {
  foreignKey: 'investigadorId'
})

Proyecto.belongsTo(Investigador, {
  foreignKey: 'investigadorId'
})

Proyecto.hasMany(Publicacion, {
  foreignKey: 'proyectoId'
})

Publicacion.belongsTo(Proyecto, {
  foreignKey: 'proyectoId'
})

export {
  Investigador,
  Proyecto,
  Publicacion
}