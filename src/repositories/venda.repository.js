const Venda = require('../models/venda.model')

const createVenda = async (venda) => await Venda.create(venda)
const getVenda = async (vendaId) => await Venda.findByPk(vendaId)
const getVendas = async () => await Venda.findAll({})
const deleteVenda = async (vendaId) => await Venda.destroy({ where: { venda_id: vendaId } })
const updateVenda = async (venda) => {
  const { venda_id } = venda
  delete venda.venda_id
  await Venda.update(venda, { where: { venda_id } })
  return await getVenda(venda.venda_id)
}

module.exports = {
  createVenda,
  getVenda,
  getVendas,
  deleteVenda,
  updateVenda
}
