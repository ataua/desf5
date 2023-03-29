const { Sequelize } = require('sequelize')

const db = new Sequelize(
  'postgres://postgres:postgres@0.0.0.0/desf5',
  {
    dialect: 'postgres'
  }
)

module.exports = db
