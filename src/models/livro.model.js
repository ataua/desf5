const db = require('../db/pg')
const S = require('sequelize')
const Autor = require('./autor.model')

const Livro = db.define(
  'livros',
  {
    livro_id: {
      type: S.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: true
    },
    nome: {
      type: S.STRING,
      allowNull: false
    },
    valor: {
      type: S.DECIMAL(10, 2),
      allowNull: false
    },
    estoque: {
      type: S.INTEGER,
      allowNull: false
    },
    autor_id: {
      type: S.INTEGER,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
)

Livro.belongsTo(Autor, { foreignKey: 'autor_id', onDelete: 'CASCADE' })

module.exports = Livro
