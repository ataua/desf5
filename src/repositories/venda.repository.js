/* eslint-disable camelcase */
const Livro = require('../models/livro.model')
const Venda = require('../models/venda.model')
const Autor = require('../models/autor.model')

const createVenda = async (venda) => await Venda.create(venda)

const getVenda = async (vendaId) => await Venda.findByPk(vendaId)

const getVendas = async () => await Venda.findAll({})

const getVendasByQuery = async (query) => await Venda.findAll({ where: query })

const getVendasByAutor = async (autor_id) => await Venda.findAll({
  include: {
    model: Livro,
    where: { autor_id },
    include: {
      model: Autor,
      as: 'autor',
      where: { autor_id }
    }
  }
})

module.exports = {
  createVenda,
  getVenda,
  getVendas,
  getVendasByQuery,
  getVendasByAutor
}
