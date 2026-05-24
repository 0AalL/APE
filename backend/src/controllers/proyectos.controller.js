import { Proyecto, Investigador } from '../models/index.js'

export const getProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.findAll({
      include: Investigador
    })

    res.json(proyectos)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

export const getProyecto = async (req, res) => {
  try {
    const proyecto = await Proyecto.findByPk(
      req.params.id,
      {
        include: Investigador
      }
    )

    if (!proyecto) {
      return res.status(404).json({
        message: 'Proyecto no encontrado'
      })
    }

    res.json(proyecto)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

export const createProyecto = async (req, res) => {
  try {
    const proyecto = await Proyecto.create(req.body)

    res.status(201).json(proyecto)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

export const updateProyecto = async (req, res) => {
  try {
    const proyecto = await Proyecto.findByPk(
      req.params.id
    )

    if (!proyecto) {
      return res.status(404).json({
        message: 'Proyecto no encontrado'
      })
    }

    await proyecto.update(req.body)

    res.json(proyecto)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

export const deleteProyecto = async (req, res) => {
  try {
    const proyecto = await Proyecto.findByPk(
      req.params.id
    )

    if (!proyecto) {
      return res.status(404).json({
        message: 'Proyecto no encontrado'
      })
    }

    await proyecto.destroy()

    res.json({
      message: 'Proyecto eliminado'
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}