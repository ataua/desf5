const Cliente = require('../models/cliente.model')

const createCliente = async (cliente) => await Cliente.create(cliente, { attributes: { exclude: ['senha'] } })

const getCliente = async (clienteId) => await Cliente.findByPk(clienteId, { attributes: { exclude: ['senha'] } })

const getClienteByEmail = async (email) => await Cliente.findOne({ where: { email }, attributes: { exclude: ['senha'] } })

const getClientes = async () => await Cliente.findAll({ attributes: { exclude: ['senha'] } })

const deleteCliente = async (clienteId) => await Cliente.destroy({ where: { cliente_id: parseInt(clienteId) } })

const updateCliente = async (cliente) => {
  await Cliente.update(cliente, { where: { cliente_id: cliente.cliente_id } })
  return await getCliente(cliente.cliente_id)
}

module.exports = {
  createCliente,
  getCliente,
  getClienteByEmail,
  getClientes,
  deleteCliente,
  updateCliente
}
