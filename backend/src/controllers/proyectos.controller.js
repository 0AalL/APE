import { Proyecto, Investigador, Publicacion } from '../models/index.js'

/**
 * GET TODOS
 */
export const getProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Investigador,
          as: 'investigadores'
        },
        {
          model: Publicacion,
          as: 'publicaciones'
        }
      ]
    })

    res.json(proyectos)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * GET POR ID
 */
export const getProyecto = async (req, res) => {
  try {
    const proyecto = await Proyecto.findByPk(req.params.id, {
      include: [
        {
          model: Investigador,
          as: 'investigadores'
        },
        {
          model: Publicacion,
          as: 'publicaciones'
        }
      ]
    })

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

/**
 * CREATE (PROYECTO + INVESTIGADORES)
 */
export const createProyecto = async (req, res) => {
  try {
    const {
      titulo,
      descripcion,
      objetivos,
      resultados,
      investigadores 
    } = req.body

    const proyecto = await Proyecto.create({
      titulo,
      descripcion,
      objetivos,
      resultados
    })

    // 👇 asignar investigadores si vienen
    if (investigadores && investigadores.length > 0) {
      await proyecto.addInvestigadores(investigadores)
    }

    const proyectoCompleto = await Proyecto.findByPk(proyecto.id, {
      include: [
        { model: Investigador, as: 'investigadores' }
      ]
    })

    res.status(201).json(proyectoCompleto)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * UPDATE (PROYECTO + INVESTIGADORES)
 */
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
      descripcion,
      objetivos,
      resultados,
      investigadores 
    } = req.body

    await proyecto.update({
      titulo,
      descripcion,
      objetivos,
      resultados
    })

    // 👇 si mandan investigadores, reemplazamos los anteriores
    if (investigadores) {
      await proyecto.setInvestigadores(investigadores)
    }

    const proyectoActualizado = await Proyecto.findByPk(proyecto.id, {
      include: [
        { model: Investigador, as: 'investigadores' },
        { model: Publicacion, as: 'publicaciones' }
      ]
    })

    res.json(proyectoActualizado)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * DELETE
 */
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
export const getProyectoDetalles = async (req, res) => {
  try {
    const proyecto = await Proyecto.findByPk(req.params.id, {
      include: [
        {
          model: Investigador,
          as: 'investigadores'
        },
        {
          model: Publicacion,
          as: 'publicaciones'
        }
      ]
    })

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