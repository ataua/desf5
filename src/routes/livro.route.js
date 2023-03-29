const { Router } = require('express')
const {
  createLivro,
  getLivro,
  getLivros,
  deleteLivro,
  updateLivro
} = require('../repositories/livro.repository')
const { param, body, validationResult } = require('express-validator')
const Livro = require('../models/livro.model')

const livroRouter = Router()

livroRouter.get('/', async (req, res) => {
  try {
    return res.status(200).json(await getLivros())
  } catch (error) {
    return res.status(400).json({ erro: error.message })
  }
})

livroRouter.get('/:id',
  param('id').isNumeric(),
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const { id } = req.params
      return res.status(200).json(await getLivro(id))
    } catch (error) {
      return res.status(400).json({ erro: error.message })
    }
  }
)

livroRouter.post('/',
  body('nome').not().isEmpty().trim().escape(),
  body('email').not().isEmpty().trim().escape().custom(async (email) => {
    if (await Livro.findOne({ where: { email } })) {
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
      const { livro } = req.body
      return res.status(200).json(await createLivro(livro))
    } catch (error) {
      return res.status(400).json({ msg: error.messsage })
    }
  }
)

livroRouter.delete('/:id',
  param('id').escape().custom(async (id) => {
    if (!(await Livro.findByPk(id))) {
      Promise.reject(new Error(`Não existe livro com o id ${id}.`))
    }
  }),
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const { id } = req.params
      await deleteLivro(id)
      return res.status(204)
    } catch (error) {
      return res.status(400).json({ msg: error.messsage })
    }
  }
)

livroRouter.put('/',
  body('livro_id').not().isEmpty().trim().escape().isNumeric(),
  body('nome').not().isEmpty().trim().escape(),
  body('email').not().isEmpty().trim().escape().custom(async (email, { req }) => {
    const livro = await Livro.findOne({ where: { email } })
    if (livro.cliete_id !== parseInt(req.body.livro_id)) {
      Promise.reject(new Error('E-mail já está cadastrado para outro usuário.'))
    }
  }),
  body('senha').not().isEmpty().trim().escape(),
  body('telefone').not().isEmpty().trim().escape(),
  body('endereco').not().isEmpty().trim().escape(),
  async (req, res) => {
    try {
      const { livro } = req.body
      return res.status(200).json(await updateLivro(livro))
    } catch (error) {
      return res.status(400).json({ msg: error.messsage })
    }
  }
)

module.exports = livroRouter
