import { Contacto } from '../models/Contacto.js'

// 🔵 GET ALL
export const getAll = async (req, res) => {
  try {

    const contactos = await Contacto.findAll({
      order: [['createdAt', 'DESC']]
    })

    return res.json(contactos)

  } catch (error) {

    console.error('GET ALL ERROR:', error)

    return res.status(500).json({
      message: 'Error al obtener contactos'
    })

  }
}

// 🔵 GET BY ID
export const getById = async (req, res) => {
  try {

    const contacto = await Contacto.findByPk(req.params.id)

    if (!contacto) {
      return res.status(404).json({
        message: 'Contacto no encontrado'
      })
    }

    return res.json(contacto)

  } catch (error) {

    console.error('GET BY ID ERROR:', error)

    return res.status(500).json({
      message: 'Error al obtener contacto'
    })

  }
}

export const create = async (req, res) => {
  try {

    const contacto = await Contacto.create(req.body);

    return res.status(201).json({
      message: 'Solicitud enviada correctamente',
      contacto: contacto.toJSON() // 👈 CLAVE
    });

  } catch (error) {

    console.error('CREATE ERROR:', error);

    return res.status(500).json({
      message: 'Error al crear contacto'
    });

  }
};

// 🔵 UPDATE
export const update = async (req, res) => {
  try {

    const contacto = await Contacto.findByPk(req.params.id)

    if (!contacto) {
      return res.status(404).json({
        message: 'Contacto no encontrado'
      })
    }

    await contacto.update(req.body)

    return res.json({
      message: 'Contacto actualizado',
      contacto
    })

  } catch (error) {

    console.error('UPDATE ERROR:', error)

    return res.status(500).json({
      message: 'Error al actualizar contacto'
    })

  }
}

// 🔵 DELETE
export const remove = async (req, res) => {
  try {

    const contacto = await Contacto.findByPk(req.params.id)

    if (!contacto) {
      return res.status(404).json({
        message: 'Contacto no encontrado'
      })
    }

    await contacto.destroy()

    return res.json({
      message: 'Contacto eliminado'
    })

  } catch (error) {

    console.error('DELETE ERROR:', error)

    return res.status(500).json({
      message: 'Error al eliminar contacto'
    })

  }
}