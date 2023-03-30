const { Router } = require('express')
const {
  createLivro,
  getLivro,
  getLivros,
  getLivrosFromAutor,
  deleteLivro,
  updateLivro
} = require('../repositories/livro.repository')
const { getAutor } = require('../repositories/autor.repository')
const { param, body, validationResult } = require('express-validator')
const Livro = require('../models/livro.model')

/** TODO: cadastrar informações do livro */

const livroRouter = Router()

livroRouter.get('/', async (req, res) => {
  try {
    const autor_id = req.query.autorId || req.query.autor_id
    if (autor_id) {
      const autor = await getAutor(autor_id)
      if (!autor) {
        throw new Error(`Não existe autor cadastrado com o autor_id ${autor_id}`)
      }
      const livros = await getLivrosFromAutor(autor_id)
      return livros.length
        ? res.status(200).json(livros)
        : res.status(404).json({ erro: `Não foram encontrados livros para o autor com autor_id ${autor_id}` })
    }
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
      const livro = await getLivro(id)
      if (!livro) {
        return res.status(404).json({ erro: `Não existe livro cadastrado com livro_id ${id}` })
      }
      return res.status(200).json(livro)
    } catch (error) {
      return res.status(400).json({ erro: error.message })
    }
  }
)

livroRouter.post('/',
  body('nome').notEmpty().trim().escape(),
  body('valor').notEmpty().trim().escape().isFloat(),
  body('estoque').notEmpty().isInt(),
  body('autor_id').notEmpty().isInt(),
  async (req, res) => {
    const livro = req.body
    console.log(livro)
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      return res.status(200).json(await createLivro(livro))
    } catch (error) {
      return res.status(400).json({ erro: error.message })
    }
  }
)

livroRouter.delete('/:id',
  param('id').escape().isNumeric(),
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const { id } = req.params
      if (!(await Livro.findByPk(id))) {
        throw new Error(`Não existe livro com o id ${id}.`)
      }
      await deleteLivro(id)
      return res.sendStatus(204)
    } catch (error) {
      return res.status(400).json({ erro: error.message })
    }
  }
)

livroRouter.put('/',
  body('livro_id').notEmpty().isInt(),
  body('nome').notEmpty().trim().escape(),
  body('valor').notEmpty().trim().escape().isFloat(),
  body('estoque').notEmpty().isInt(),
  body('autor_id').notEmpty().isInt(),
  async (req, res) => {
    try {
      const { livro } = req.body
      return res.status(200).json(await updateLivro(livro))
    } catch (error) {
      return res.status(400).json({ msg: error.message })
    }
  }
)

module.exports = livroRouter
