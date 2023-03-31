/* eslint-disable camelcase */
const { Router } = require('express')
const { param, body, validationResult } = require('express-validator')

const {
  createLivro,
  getLivro,
  getLivros,
  getLivrosFromAutor,
  deleteLivro,
  updateLivro
} = require('../repositories/livro.repository')
const { getAutor } = require('../repositories/autor.repository')
const {
  createInfo,
  deleteInfo,
  updateInfo,
  createAvaliacao,
  deleteAvaliacao
} = require('../repositories/livro-info.repository')
// const Livro = require('../models/livro.model')

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
      if (!(await getLivro(id))) {
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

livroRouter.post('/info', async (req, res) => {
  await createInfo(req.body)
  res.status(201).json({ msg: 'Informação do livro criada' })
})

livroRouter.put('/info', async (req, res) => {
  await updateInfo(req.body)
  res.status(201).json({ msg: 'Informação do livro atualizada' })
})

livroRouter.delete('/info/:id', async (req, res) => {
  await deleteInfo(req.params.id)
  res.status(204).end()
})

livroRouter.post('/:id/avaliacao', async (req, res) => {
  await createAvaliacao(req.params.id, req.body)
  return res.status(200).json({ msg: 'Avaliação criada.' })
})

livroRouter.delete('/:id/avaliacao/:index', async (req, res) => {
  await deleteAvaliacao(req.params.id, req.params.index)
  res.status(204).end()
})

module.exports = livroRouter
