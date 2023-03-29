const db = require('../db/pg')
const S = require('sequelize')
const Cliente = require('./cliente.model')
const Livro = require('./livro.model')

const Venda = db.define(
  'vendas',
  {
    venda_id: {
      type: S.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: true
    },
    valor: {
      type: S.DECIMAL(10, 2),
      allowNull: false
    },
    data: {
      type: S.DATEONLY,
      allowNull: false
    },
    cliente_id: {
      type: S.INTEGER,
      allowNull: false
    },
    livro_id: {
      type: S.INTEGER,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
)

Venda.belongsTo(Cliente, { foreignKey: 'cliente_id', onDelete: 'CASCADE' })
Venda.belongsTo(Livro, { foreignKey: 'livro_id', onDelete: 'CASCADE' })

module.exports = Venda
