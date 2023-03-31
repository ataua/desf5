const mongoose = require('mongoose')
const AvaliacaoSchema = require('./avaliacao.schema')

const LivroInfoSchema = new mongoose.Schema(
  {
    livroId: Number,
    descricao: String,
    paginas: Number,
    editora: String,
    avaliacoes: [AvaliacaoSchema]
  },
  {
    collection: 'livroInfo'
  }
)

module.exports = LivroInfoSchema
