const { Router } = require('express')
const {
  createVenda,
  getVenda,
  getVendas,
  deleteVenda,
  updateVenda
} = require('../repositories/venda.repository')
const { param, body, validationResult } = require('express-validator')
const Venda = require('../models/venda.model')

const vendaRouter = Router()

vendaRouter.get('/', async (req, res) => {
  try {
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
  body('nome').not().isEmpty().trim().escape(),
  body('email').not().isEmpty().trim().escape().custom(async (email) => {
    if (await Venda.findOne({ where: { email } })) {
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
      const { venda } = req.body
      return res.status(200).json(await createVenda(venda))
    } catch (error) {
      return res.status(400).json({ msg: error.messsage })
    }
  }
)

vendaRouter.delete('/:id',
  param('id').escape().custom(async (id) => {
    if (!(await Venda.findByPk(id))) {
      Promise.reject(new Error(`Não existe venda com o id ${id}.`))
    }
  }),
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const { id } = req.params
      await deleteVenda(id)
      return res.status(204)
    } catch (error) {
      return res.status(400).json({ msg: error.messsage })
    }
  }
)

vendaRouter.put('/',
  body('venda_id').not().isEmpty().trim().escape().isNumeric(),
  body('nome').not().isEmpty().trim().escape(),
  body('email').not().isEmpty().trim().escape().custom(async (email, { req }) => {
    const venda = await Venda.findOne({ where: { email } })
    if (venda.cliete_id !== parseInt(req.body.venda_id)) {
      Promise.reject(new Error('E-mail já está cadastrado para outro usuário.'))
    }
  }),
  body('senha').not().isEmpty().trim().escape(),
  body('telefone').not().isEmpty().trim().escape(),
  body('endereco').not().isEmpty().trim().escape(),
  async (req, res) => {
    try {
      const { venda } = req.body
      return res.status(200).json(await updateVenda(venda))
    } catch (error) {
      return res.status(400).json({ msg: error.messsage })
    }
  }
)

module.exports = vendaRouter
