import { Investigador } from '../models/Investigador.js'

export const getInvestigadores = async (req, res) => {
  const investigadores = await Investigador.findAll()

  res.json(investigadores)
}

export const createInvestigador = async (req, res) => {
  const investigador = await Investigador.create(req.body)

  res.status(201).json(investigador)
}