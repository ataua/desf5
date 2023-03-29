const { Sequelize } = require('sequelize')

const db = new Sequelize(
  `postgres://postgres:postgres@0.0.0.0/postgres`,
  {
    dialect: 'postgres'
  }
)

export default db
