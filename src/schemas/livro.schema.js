import mongoose from 'mongoose'
import { AvaliacaoSchema } from './avaliacao.schema';

export const AvaliacaoSchema = new mongoose.Schema(
  {
    livroId: Number,
    descricao: String,
    paginas: Number,
    editora: String,
    avaliacoes: [ AvaliacaoSchema ]
  },
  {
    collection: "livroInfo"
  }
)