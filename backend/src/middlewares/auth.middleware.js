import jwt from 'jsonwebtoken'

export const authRequired = (
  req,
  res,
  next
) => {
  try {
    const token =
      req.headers.authorization

    if (!token) {
      return res.status(401).json({
        message: 'Token requerido'
      })
    }

    const tokenClean =
      token.replace('Bearer ', '')

    const user = jwt.verify(
      tokenClean,
      process.env.JWT_SECRET
    )

    req.user = user

    next()
  } catch (error) {
    return res.status(401).json({
      message: 'Token inválido'
    })
  }
}