export interface Investigador {
  id?: number

  nombre: string
  cargo: string
  correo: string

  orcid?: string
  facebook?: string
  linkedin?: string
  instagram?: string
  telegram?: string

  foto?: string
  biografia?: string

  createdAt?: string
  updatedAt?: string
}