const { Router } = require('express')
const {
  createCliente,
  getCliente,
  getClienteByEmail,
  getClientes,
  deleteCliente,
  updateCliente
} = require('../repositories/cliente.repository')
const { param, body, validationResult } = require('express-validator')

const clienteRouter = Router()

clienteRouter.get('/', async (req, res) => {
  try {
    return res.status(200).json(await getClientes())
  } catch (error) {
    return res.status(400).json({ erro: error.message })
  }
})

clienteRouter.get('/:id',
  param('id').isNumeric(),
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const { id } = req.params
      return res.status(200).json(await getCliente(id))
    } catch (error) {
      return res.status(400).json({ erro: error.message })
    }
  }
)

clienteRouter.post('/',
  body('nome').not().isEmpty().trim().escape(),
  body('email').not().isEmpty().trim().escape().isEmail(),
  body('senha').not().isEmpty().trim().escape(),
  body('telefone').not().isEmpty().trim().escape(),
  body('endereco').not().isEmpty().trim().escape(),
  async (req, res) => {
    try {
      debugger
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const cliente = req.body
      const emailEmUso = await getClienteByEmail(cliente.email)
      if (emailEmUso) {
        throw new Error('E-mail já cadastrado')
      }
      return res.status(200).json(await createCliente(cliente))
    } catch (error) {
      return res.status(400).json({ msg: error.message })
    }
  }
)
clienteRouter.delete('/:id',
  param('id').isNumeric(),
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const { id } = req.params
      const cliente = await getCliente(id)
      if (cliente) {
        await deleteCliente(id)
        return res.status(204).json({})
      }
      throw new Error(`Não existe cliente com o id ${id}.`)
    } catch (error) {
      return res.status(400).json({ erro: error.message })
    }
  }
)

clienteRouter.put('/',
  body('cliente_id').trim().escape().not().isEmpty().isNumeric(),
  body('nome').trim().escape().not().isEmpty(),
  body('email').not().isEmpty().trim().escape().isEmail(),
  body('senha').not().isEmpty().trim().escape(),
  body('telefone').not().isEmpty().trim().escape(),
  body('endereco').not().isEmpty().trim().escape(),
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const cliente = req.body
      const clienteExists = await getCliente(cliente.cliente_id)
      if (!clienteExists) {
        throw new Error(`Não existe cliente cadastrado com o cliente_id ${cliente.cliente_id}`)
      }
      const found = await getClienteByEmail(cliente.email)
      if (!!found && found.cliente_id !== parseInt(cliente.cliente_id)) {
        throw new Error('E-mail já está cadastrado para outro cliente.')
      }
      return res.status(200).json(await updateCliente(cliente))
    } catch (error) {
      return res.status(400).json({ msg: error.message })
    }
  }
)

module.exports = clienteRouter
