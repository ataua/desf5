const express = require('express')
const clienteRouter = require('./routes/cliente.route')
const autorRouter = require('./routes/autor.route')
const livroRouter = require('./routes/livro.route')
const vendaRouter = require('./routes/venda.route')
const dbRouter = require('./routes/db.route')
const db = require('./db/pg')
const basicAuth = require('express-basic-auth')

db.sync()

const app = express()
app.use(express.json())
app.use(basicAuth({
  users: { admin: 'desafio-igti-nodejs' }
}))

app.get('/', (req, res) => {
  res.json({ msg: 'Ok!' })
})

app.use('/cliente', clienteRouter)
app.use('/autor', autorRouter)
app.use('/livro', livroRouter)
app.use('/venda', vendaRouter)
app.use('/db', dbRouter)

app.listen('3001', () => {
  console.log('App running on port 3001!')
})
