const express = require('express')
const clienteRouter = require('./routes/cliente.route')
const autorRouter = require('./routes/autor.route')
const livroRouter = require('./routes/livro.route')
const vendaRouter = require('./routes/venda.route')
const db = require('./db/pg')

db.sync()

const app = express().use(express.json())

app.get('/', (req, res) => {
  res.json({ msg: 'Ok!' })
})

app.use('/cliente', clienteRouter)
app.use('/autor', autorRouter)
app.use('/livro', livroRouter)
app.use('/venda', vendaRouter)

app.listen('3001', () => {
  console.log('App running on port 3001!')
})
