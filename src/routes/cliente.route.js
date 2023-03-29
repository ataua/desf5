const { Router } = require('express')
const {
  createCliente,
  getCliente,
  getClientes,
  deleteCliente,
  updateCliente
} = require('../repositories/cliente.repository')
const { param, body, validationResult } = require('express-validator')
const Cliente = require('../models/cliente.model')

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
  body('email').not().isEmpty().trim().escape().custom(async (email) => {
    if (await Cliente.findOne({ where: { email } })) {
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
      const { cliente } = req.body
      return res.status(200).json(await createCliente(cliente))
    } catch (error) {
      return res.status(400).json({ msg: error.messsage })
    }
  }
)

clienteRouter.delete('/:id',
  param('id').escape().custom(async (id) => {
    if (!(await Cliente.findByPk(id))) {
      Promise.reject(new Error(`Não existe cliente com o id ${id}.`))
    }
  }),
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const { id } = req.params
      await deleteCliente(id)
      return res.status(204)
    } catch (error) {
      return res.status(400).json({ msg: error.messsage })
    }
  }
)

clienteRouter.put('/',
  body('cliente_id').not().isEmpty().trim().escape().isNumeric(),
  body('nome').not().isEmpty().trim().escape(),
  body('email').not().isEmpty().trim().escape().custom(async (email, { req }) => {
    const cliente = await Cliente.findOne({ where: { email } })
    if (cliente.cliete_id !== parseInt(req.body.cliente_id)) {
      Promise.reject(new Error('E-mail já está cadastrado para outro usuário.'))
    }
  }),
  body('senha').not().isEmpty().trim().escape(),
  body('telefone').not().isEmpty().trim().escape(),
  body('endereco').not().isEmpty().trim().escape(),
  async (req, res) => {
    try {
      const { cliente } = req.body
      return res.status(200).json(await updateCliente(cliente))
    } catch (error) {
      return res.status(400).json({ msg: error.messsage })
    }
  }
)

module.exports = clienteRouter
