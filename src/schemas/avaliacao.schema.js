const mongoose = require('mongoose')

const AvaliacaoSchema = new mongoose.Schema(
  {
    nome: String,
    nota: Number,
    avaliacao: String
  },
  {
    collection: 'livroInfo'
  }
)

module.exports = AvaliacaoSchema
