import { Proyecto } from '../models/index.js'

export const getProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.findAll({
      order: [['createdAt', 'DESC']]
    })

    res.json(proyectos)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getProyecto = async (req, res) => {
  try {
    const proyecto = await Proyecto.findByPk(req.params.id)

    if (!proyecto) {
      return res.status(404).json({
        message: 'Proyecto no encontrado'
      })
    }

    res.json(proyecto)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createProyecto = async (req, res) => {
  try {

    const {
      titulo,
      participantes,
      descripcion,
      objetivos,
      resultados
    } = req.body

    const proyecto = await Proyecto.create({
      titulo,
      participantes,
      descripcion,
      objetivos,
      resultados
    })

    res.status(201).json(proyecto)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateProyecto = async (req, res) => {
  try {

    const proyecto = await Proyecto.findByPk(req.params.id)

    if (!proyecto) {
      return res.status(404).json({
        message: 'Proyecto no encontrado'
      })
    }

    const {
      titulo,
      participantes,
      descripcion,
      objetivos,
      resultados
    } = req.body

    await proyecto.update({
      titulo,
      participantes,
      descripcion,
      objetivos,
      resultados
    })

    res.json(proyecto)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteProyecto = async (req, res) => {
  try {

    const proyecto = await Proyecto.findByPk(req.params.id)

    if (!proyecto) {
      return res.status(404).json({
        message: 'Proyecto no encontrado'
      })
    }

    await proyecto.destroy()

    res.json({ message: 'Proyecto eliminado' })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}