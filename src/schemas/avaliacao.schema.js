import mongoose from 'mongoose'

export const AvaliacaoSchema = new mongoose.Schema(
    {
        nome: String,
        nota: Number,
        avaliacao: String
    },
    {
        collection: "livroInfo"
    }
)