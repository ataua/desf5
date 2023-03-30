const db = require('../db/pg')
const S = require('sequelize')

const Cliente = db.define(
  'clientes',
  {
    cliente_id: {
      type: S.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: true
    },
    nome: {
      type: S.STRING,
      allowNull: false
    },
    email: {
      type: S.STRING,
      allowNull: false
    },
    senha: {
      type: S.STRING,
      allowNull: false,
      select: false
    },
    telefone: {
      type: S.STRING,
      allowNull: false
    },
    endereco: {
      type: S.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
)

module.exports = Cliente
