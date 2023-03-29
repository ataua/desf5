const Cliente = require('../models/cliente.model')

const createCliente = async (cliente) => await Cliente.create(cliente)
const getCliente = async (clienteId) => await Cliente.findByPk(clienteId)
const getClientes = async () => await Cliente.findAll({})
const deleteCliente = async (clienteId) => await Cliente.destroy({ where: { cliente_id: clienteId } })
const updateCliente = async (cliente) => {
  const { cliente_id } = cliente
  delete cliente.cliente_id
  await Cliente.update(cliente, { where: { cliente_id } })
  return await getCliente(cliente.cliente_id)
}

module.exports = {
  createCliente,
  getCliente,
  getClientes,
  deleteCliente,
  updateCliente
}
