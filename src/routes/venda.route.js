/* eslint-disable camelcase */
const { Router } = require('express')
const { param, body, validationResult } = require('express-validator')

const {
  createVenda,
  getVenda,
  getVendas,
  getVendasByQuery,
  getVendasByAutor
} = require('../repositories/venda.repository')
const { getCliente } = require('../repositories/cliente.repository')
const {
  getLivro,
  updateLivro
} = require('../repositories/livro.repository')

const vendaRouter = Router()

vendaRouter.get('/', async (req, res) => {
  try {
    const autor_id = req.query.autor_id || req.query.autorId || null
    if (autor_id) {
      return res.status(200).json(await getVendasByAutor(autor_id))
    }
    const livro_id = req.query.livro_id || req.query.livroId || null
    const cliente_id = req.query.cliente_id || req.query.clienteId || null
    const query = {
      ...(livro_id && { livro_id: parseInt(livro_id) }),
      ...(cliente_id && { cliente_id: parseInt(cliente_id) })
    }
    if (Object.keys(query).includes('livro_id') || Object.keys(query).includes('cliente_id')) {
      const result = await getVendasByQuery(query)
      if (result) {
        return res.status(200).json(result)
      }
      return res.status(404).json({ erro: `Não foram encontrados livros para os dados: ${JSON.stringify(query)} ` })
    }
    return res.status(200).json(await getVendas())
  } catch (error) {
    return res.status(400).json({ erro: error.message })
  }
})

vendaRouter.get('/:id',
  param('id').isNumeric(),
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const { id } = req.params
      return res.status(200).json(await getVenda(id))
    } catch (error) {
      return res.status(400).json({ erro: error.message })
    }
  }
)

vendaRouter.post('/',
  body('data').not().isEmpty().trim().escape().isDate(),
  body('cliente_id').not().isEmpty().isInt().escape(),
  body('livro_id').not().isEmpty().isInt().escape(),
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const venda = req.body
      const cliente = await getCliente(venda.cliente_id)
      if (!cliente) {
        return res.status(400).json({ erro: `Cliente não encontrado com o cliente_id ${venda.cliente_id}` })
      }
      const livro = await getLivro(venda.livro_id)
      if (!livro) {
        return res.status(400).json({ erro: `Livro não encontrado com o livro_id ${venda.livro_id}` })
      }
      if (livro.estoque <= 0) {
        return res.status(400).json({ erro: `Não há estoque disponível do livro com livro_id ${venda.livro_id}` })
      }
      --livro.estoque
      await updateLivro(livro)
      venda.valor = livro.valor
      return res.status(200).json(await createVenda(venda))
    } catch (error) {
      return res.status(400).json({ msg: error.message })
    }
  }
)

module.exports = vendaRouter
