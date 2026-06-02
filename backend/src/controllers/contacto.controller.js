import { Contacto } from '../models/Contacto.js'

export const getAll = async (req, res) => {
  try {

    const contactos =
      await Contacto.findAll({
        order: [['createdAt', 'DESC']]
      })

    res.json(contactos)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }
}

export const getById = async (req, res) => {
  try {

    const contacto =
      await Contacto.findByPk(req.params.id)

    if (!contacto) {
      return res.status(404).json({
        message: 'Contacto no encontrado'
      })
    }

    res.json(contacto)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }
}

export const create = async (req, res) => {
  try {

    const {
      nombre,
      empresa,
      correo,
      areaInteres,
      asunto,
      mensaje,
      aceptaPrivacidad
    } = req.body

    if (!aceptaPrivacidad) {
      return res.status(400).json({
        message: 'Debe aceptar la política de privacidad'
      })
    }

    const contacto =
      await Contacto.create({
        nombre,
        empresa,
        correo,
        areaInteres,
        asunto,
        mensaje,
        aceptaPrivacidad
      })

    res.status(201).json({
      message: 'Solicitud enviada correctamente',
      contacto
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }
}

export const update = async (req, res) => {
  try {

    const contacto =
      await Contacto.findByPk(req.params.id)

    if (!contacto) {
      return res.status(404).json({
        message: 'Contacto no encontrado'
      })
    }

    await contacto.update(req.body)

    res.json({
      message: 'Contacto actualizado',
      contacto
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }
}

export const remove = async (req, res) => {
  try {

    const contacto =
      await Contacto.findByPk(req.params.id)

    if (!contacto) {
      return res.status(404).json({
        message: 'Contacto no encontrado'
      })
    }

    await contacto.destroy()

    res.json({
      message: 'Contacto eliminado'
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }
}