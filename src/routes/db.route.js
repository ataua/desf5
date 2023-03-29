const fs = require('fs')
const path = require('path')
const db = require('../db/pg')

const { Router } = require('express')
const { QueryTypes } = require('sequelize')
const dbRouter = new Router()

const sqlFilePath = path.join(__dirname, '../../postgres-init-scripts/init-postgres.sql')
const sql = fs.readFileSync(sqlFilePath, 'utf8')

dbRouter.get('/pg', async (req, res) => {
  try {
    await db.query(sql, { type: QueryTypes.RAW })
    res.status(201).json({ msg: 'DB PG atualizado.' })
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
})

dbRouter.get('/mongo', async (req, res) => {
  try {
    await db.query(sql, { type: QueryTypes.RAW })
    res.status(201).json({ msg: 'DB PG atualizado.' })
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
})

module.exports = dbRouter
