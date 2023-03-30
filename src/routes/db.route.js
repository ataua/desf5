const fs = require('fs')
const path = require('path')
const db = require('../db/pg')
const connect = require('../db/mongo')
const { Router } = require('express')
const { QueryTypes } = require('sequelize')
const updateMongo = require('../db/update-mongo')

const dbRouter = new Router()

dbRouter.get('/pg', async (req, res) => {
  const sqlFilePath = path.join(__dirname, '../../postgres-init-scripts/init-postgres.sql')
  const sql = fs.readFileSync(sqlFilePath, 'utf8')
  try {
    await db.query(sql, { type: QueryTypes.RAW })
    res.status(201).json({ msg: 'DB PG atualizado.' })
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
})

dbRouter.get('/mongo', async (req, res) => {
  try {
    const mongo = await connect()
    const collections = await mongo.connection.db.listCollections({ name: 'livroInfo' }).toArray()
    if (collections.length !== 0) {
      await mongo.connection.dropCollection('livroInfo')
    }
    await updateMongo(mongo.connection)
    await mongo.connection.close()
    return res.status(201).json({ msg: 'DB Mongo atualizado.' })
  } catch (error) {
    res.status(500).json({ erro: error.message })
  }
})

module.exports = dbRouter
