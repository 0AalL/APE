import { Publicacion, Proyecto } from '../models/index.js'

/**
 * ======================================
 * 📚 GET TODAS LAS PUBLICACIONES
 * ======================================
 */
export const getPublicaciones = async (req, res) => {
  try {
    const publicaciones = await Publicacion.findAll({
      include: {
        model: Proyecto,
        as: 'proyecto'
      }
    })

    res.json(publicaciones)
  } catch (error) {
    console.error('Error getPublicaciones:', error)
    res.status(500).json({
      message: error.message
    })
  }
}

/**
 * ======================================
 * 📄 GET PUBLICACIÓN POR ID
 * ======================================
 */
export const getPublicacion = async (req, res) => {
  try {
    const publicacion = await Publicacion.findByPk(req.params.id, {
      include: {
        model: Proyecto,
        as: 'proyecto'
      }
    })

    if (!publicacion) {
      return res.status(404).json({
        message: 'Publicación no encontrada'
      })
    }

    res.json(publicacion)
  } catch (error) {
    console.error('Error getPublicacion:', error)
    res.status(500).json({
      message: error.message
    })
  }
}

/**
 * ======================================
 * ➕ CREAR PUBLICACIÓN
 * ======================================
 */
export const createPublicacion = async (req, res) => {
  try {
    const publicacion = await Publicacion.create(req.body)

    res.status(201).json(publicacion)
  } catch (error) {
    console.error('Error createPublicacion:', error)
    res.status(500).json({
      message: error.message
    })
  }
}

/**
 * ======================================
 * ✏️ ACTUALIZAR PUBLICACIÓN
 * ======================================
 */
export const updatePublicacion = async (req, res) => {
  try {
    const publicacion = await Publicacion.findByPk(req.params.id)

    if (!publicacion) {
      return res.status(404).json({
        message: 'Publicación no encontrada'
      })
    }

    await publicacion.update(req.body)

    res.json(publicacion)
  } catch (error) {
    console.error('Error updatePublicacion:', error)
    res.status(500).json({
      message: error.message
    })
  }
}

/**
 * ======================================
 * 🗑️ ELIMINAR PUBLICACIÓN
 * ======================================
 */
export const deletePublicacion = async (req, res) => {
  try {
    const publicacion = await Publicacion.findByPk(req.params.id)

    if (!publicacion) {
      return res.status(404).json({
        message: 'Publicación no encontrada'
      })
    }

    await publicacion.destroy()

    res.json({
      message: 'Publicación eliminada correctamente'
    })
  } catch (error) {
    console.error('Error deletePublicacion:', error)
    res.status(500).json({
      message: error.message
    })
  }
}