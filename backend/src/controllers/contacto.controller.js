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

    // Validar que no esté vacío
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: 'Los datos del formulario no pueden estar vacíos'
      });
    }

    // Limpiar espacios en blanco
    const datosLimpios = {
      nombre: req.body.nombre?.trim(),
      empresa: req.body.empresa?.trim() || null,
      correo: req.body.correo?.trim(),
      areaInteres: req.body.areaInteres,
      asunto: req.body.asunto?.trim(),
      mensaje: req.body.mensaje?.trim(),
      aceptaPrivacidad: req.body.aceptaPrivacidad
    };

    const contacto = await Contacto.create(datosLimpios);

    return res.status(201).json({
      success: true,
      message: '✅ Solicitud enviada correctamente. Pronto nos pondremos en contacto contigo.',
      contacto: contacto.toJSON()
    });

  } catch (error) {

    console.error('CREATE ERROR:', error);

    // Errores de validación de Sequelize
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Error de validación en los datos',
        errors: error.errors.map(e => e.message)
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Error al enviar el mensaje. Por favor, intenta de nuevo.'
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