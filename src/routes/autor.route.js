const { Router } = require('express')
const {
  createAutor,
  getAutor,
  getAutors,
  deleteAutor,
  updateAutor
} = require('../repositories/autor.repository')
const { param, body, validationResult } = require('express-validator')
const Autor = require('../models/autor.model')

const autorRouter = Router()

autorRouter.get('/', async (req, res) => {
  try {
    return res.status(200).json(await getAutors())
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
  body('email').not().isEmpty().trim().escape().custom(async (email) => {
    if (await Autor.findOne({ where: { email } })) {
      Promise.reject(new Error('E-mail já está cadastrado.'))
    }
  }),
  body('senha').not().isEmpty().trim().escape(),
  body('telefone').not().isEmpty().trim().escape(),
  body('endereco').not().isEmpty().trim().escape(),
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const { autor } = req.body
      return res.status(200).json(await createAutor(autor))
    } catch (error) {
      return res.status(400).json({ msg: error.messsage })
    }
  }
)

autorRouter.delete('/:id',
  param('id').escape().custom(async (id) => {
    if (!(await Autor.findByPk(id))) {
      Promise.reject(new Error(`Não existe autor com o id ${id}.`))
    }
  }),
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const { id } = req.params
      await deleteAutor(id)
      return res.status(204)
    } catch (error) {
      return res.status(400).json({ msg: error.messsage })
    }
  }
)

autorRouter.put('/',
  body('autor_id').not().isEmpty().trim().escape().isNumeric(),
  body('nome').not().isEmpty().trim().escape(),
  body('email').not().isEmpty().trim().escape().custom(async (email, { req }) => {
    const autor = await Autor.findOne({ where: { email } })
    if (autor.cliete_id !== parseInt(req.body.autor_id)) {
      Promise.reject(new Error('E-mail já está cadastrado para outro usuário.'))
    }
  }),
  body('senha').not().isEmpty().trim().escape(),
  body('telefone').not().isEmpty().trim().escape(),
  body('endereco').not().isEmpty().trim().escape(),
  async (req, res) => {
    try {
      const { autor } = req.body
      return res.status(200).json(await updateAutor(autor))
    } catch (error) {
      return res.status(400).json({ msg: error.messsage })
    }
  }
)

module.exports = autorRouter
