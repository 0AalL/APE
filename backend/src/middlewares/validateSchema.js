export const validateSchema = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body)

  if (!result.success) {
    console.log(result.error.issues)

    return res.status(400).json(result.error.issues)
  }

  next()
}