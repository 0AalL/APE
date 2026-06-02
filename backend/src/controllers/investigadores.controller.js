import fs from 'fs'
import path from 'path'
import { Investigador } from '../models/Investigador.js'
import { Proyecto } from '../models/Proyecto.js'
//  GET ALL
export const getInvestigadores = async (req, res) => {
  try {
    const data = await Investigador.findAll()
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener investigadores' })
  }
}

// 📥 GET BY ID
export const getInvestigadorById = async (req, res) => {
  try {
    const data = await Investigador.findByPk(req.params.id)

    if (!data) {
      return res.status(404).json({ message: 'No encontrado' })
    }

    res.json(data)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener investigador' })
  }
}

// ➕ CREATE CON FOTO
export const createInvestigador = async (req, res) => {
  try {
    const data = req.body

    const investigador = await Investigador.create({
      nombre: data.nombre,
      cargo: data.cargo,
      correo: data.correo,
      orcid: data.orcid,
      facebook: data.facebook,
      linkedin: data.linkedin,
      instagram: data.instagram,
      telegram: data.telegram,
      biografia: data.biografia,

      // 📸 FOTO CORRECTA
      foto: req.file ? req.file.filename : null
    })

    res.status(201).json(investigador)

  } catch (error) {
    res.status(400).json({
      message: 'Error al crear investigador',
      error: error.message
    })
  }
}

// ✏️ UPDATE CON FOTO
export const updateInvestigador = async (req, res) => {
  try {
    const investigador = await Investigador.findByPk(req.params.id)

    if (!investigador) {
      return res.status(404).json({ message: 'No encontrado' })
    }

    const data = req.body

    // 📸 nueva imagen
    if (req.file) {
      data.foto = req.file.filename
    }

    await investigador.update(data)

    res.json(investigador)

  } catch (error) {
    res.status(400).json({
      message: 'Error al actualizar',
      error: error.message
    })
  }
}

// 🗑 DELETE CON BORRADO DE IMAGEN
export const deleteInvestigador = async (req, res) => {
  try {
    const investigador = await Investigador.findByPk(req.params.id)

    if (!investigador) {
      return res.status(404).json({ message: 'No encontrado' })
    }

    // 📸 borrar imagen
    if (investigador.foto) {
      const filePath = path.join(
        process.cwd(),
        'src',
        'uploads',
        investigador.foto
      )

      fs.unlink(filePath, (err) => {
        if (err) console.log('Error borrando imagen:', err)
      })
    }

    await investigador.destroy()

    res.json({ message: 'Eliminado correctamente' })

  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar' })
  }
}
export const getInvestigadorDetalles = async (req, res) => {
  try {
    const data = await Investigador.findByPk(req.params.id, {
      include: [
        {
          model: Proyecto,
          as: 'proyectos',
          through: {
            attributes: [] // ❌ no mostrar tabla intermedia
          }
        }
      ]
    })

    if (!data) {
      return res.status(404).json({ message: 'No encontrado' })
    }

    res.json(data)

  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Error al obtener detalles del investigador'
    })
  }
}