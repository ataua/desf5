const { Router } = require('express')
const {
  createAutor,
  getAutor,
  getAutorByEmail,
  getAutores,
  deleteAutor,
  updateAutor
} = require('../repositories/autor.repository')
const { param, body, validationResult } = require('express-validator')

const autorRouter = Router()

autorRouter.get('/', async (_, res) => {
  try {
    return res.status(200).json(await getAutores())
  } catch (error) {
    return res.status(400).json({ erro: error.message })
  }
})

autorRouter.get('/:id',
  param('id').isNumeric(),
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const { id } = req.params
      return res.status(200).json(await getAutor(id))
    } catch (error) {
      return res.status(400).json({ erro: error.message })
    }
  }
)

autorRouter.post('/',
  body('nome').not().isEmpty().trim().escape(),
  body('email').not().isEmpty().trim().escape().isEmail(),
  body('telefone').not().isEmpty().trim().escape(),
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const autor = req.body
      const emailEmUso = await getAutorByEmail(autor.email)
      if (emailEmUso) {
        throw new Error('E-mail já cadastrado')
      }
      return res.status(200).json(await createAutor(autor))
    } catch (error) {
      return res.status(400).json({ msg: error.message })
    }
  }
)
autorRouter.delete('/:id',
  param('id').isNumeric(),
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const { id } = req.params
      const autor = await getAutor(id)
      if (autor) {
        await deleteAutor(id)
        return res.status(204).json({})
      }
      throw new Error(`Não existe autor com o id ${id}.`)
    } catch (error) {
      return res.status(400).json({ erro: error.message })
    }
  }
)

autorRouter.put('/',
  body('autor_id').trim().escape().not().isEmpty().isNumeric(),
  body('nome').trim().escape().not().isEmpty(),
  body('email').not().isEmpty().trim().escape().isEmail(),
  body('telefone').not().isEmpty().trim().escape(),
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const autor = req.body
      const autorExists = await getAutor(autor.autor_id)
      if (!autorExists) {
        throw new Error(`Não existe autor cadastrado com o autor_id ${autor.autor_id}`)
      }
      const found = await getAutorByEmail(autor.email)
      if (!!found && found.autor_id !== parseInt(autor.autor_id)) {
        throw new Error('E-mail já está cadastrado para outro autor.')
      }
      return res.status(200).json(await updateAutor(autor))
    } catch (error) {
      return res.status(400).json({ msg: error.message })
    }
  }
)

module.exports = autorRouter
