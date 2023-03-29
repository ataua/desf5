const db = require('../db/pg');
const S = require('sequelize')

const Autor = db.define('autores', {
  autor_id: {
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
  telefone: {
    type: S.STRING,
    allowNull: false
  },
})

export default Autor