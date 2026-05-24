import {
  Publicacion,
  Proyecto
} from '../models/index.js'

export const getPublicaciones = async (
  req,
  res
) => {
  try {
    const publicaciones =
      await Publicacion.findAll({
        include: Proyecto
      })

    res.json(publicaciones)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

export const getPublicacion = async (
  req,
  res
) => {
  try {
    const publicacion =
      await Publicacion.findByPk(
        req.params.id,
        {
          include: Proyecto
        }
      )

    if (!publicacion) {
      return res.status(404).json({
        message: 'Publicación no encontrada'
      })
    }

    res.json(publicacion)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

export const createPublicacion = async (
  req,
  res
) => {
  try {
    const publicacion =
      await Publicacion.create(req.body)

    res.status(201).json(publicacion)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

export const updatePublicacion = async (
  req,
  res
) => {
  try {
    const publicacion =
      await Publicacion.findByPk(
        req.params.id
      )

    if (!publicacion) {
      return res.status(404).json({
        message: 'Publicación no encontrada'
      })
    }

    await publicacion.update(req.body)

    res.json(publicacion)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

export const deletePublicacion = async (
  req,
  res
) => {
  try {
    const publicacion =
      await Publicacion.findByPk(
        req.params.id
      )

    if (!publicacion) {
      return res.status(404).json({
        message: 'Publicación no encontrada'
      })
    }

    await publicacion.destroy()

    res.json({
      message: 'Publicación eliminada'
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}