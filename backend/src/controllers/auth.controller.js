import bcrypt from 'bcrypt'

import jwt from 'jsonwebtoken'

import { Usuario } from '../models/Usuario.js'

export const register = async (
  req,
  res
) => {
  try {
    const {
      nombre,
      email,
      password,
      rol
    } = req.body

    const userExists =
      await Usuario.findOne({
        where: { email }
      })

    if (userExists) {
      return res.status(400).json({
        message: 'El usuario ya existe'
      })
    }

    const hashedPassword =
      await bcrypt.hash(password, 10)

    const usuario =
      await Usuario.create({
        nombre,
        email,
        password: hashedPassword,
        rol
      })

    res.status(201).json({
      message: 'Usuario registrado',
      usuario
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

export const login = async (
  req,
  res
) => {
  try {
    const { email, password } = req.body

    const usuario =
      await Usuario.findOne({
        where: { email }
      })

    if (!usuario) {
      return res.status(404).json({
        message: 'Usuario no encontrado'
      })
    }

    const validPassword =
      await bcrypt.compare(
        password,
        usuario.password
      )

    if (!validPassword) {
      return res.status(401).json({
        message: 'Contraseña incorrecta'
      })
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        rol: usuario.rol
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d'
      }
    )

    res.json({
      message: 'Login exitoso',
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}