/* eslint-disable no-useless-catch */
const connect = require('../db/mongo')
const LivroInfoSchema = require('../schemas/livro-info.schema')

const createInfo = async (info) => {
  try {
    const mongo = await connect()
    const Info = mongo.model('info', LivroInfoSchema)
    info = new Info(info)
    await info.save()
  } catch (error) {
    throw error
  }
}

const getInfos = async () => {
  try {
    const mongo = await connect()
    const Info = mongo.model('info', LivroInfoSchema)
    return await Info.find({})
  } catch (error) {
    throw error
  }
}

const getInfo = async (livroId) => {
  try {
    const mongo = await connect()
    const Info = mongo.model('info', LivroInfoSchema)
    return await Info.find({ livroId })
  } catch (error) {
    throw error
  }
}

const updateInfo = async (newInfo) => {
  try {
    const mongo = await connect()
    const Info = mongo.model('info', LivroInfoSchema)
    const info = await Info.findOne(
      { livroId: parseInt(newInfo.livroId) })
    info.descricao = newInfo.descricao
    info.paginas = newInfo.paginas
    info.editora = newInfo.editora
    info.avaliacoes = info.avaliacoes || []
    if (newInfo.avaliacao) {
      info.avaliacoes.push(newInfo.avaliacao)
    }
    await info.save()
  } catch (error) {
    throw error
  }
}

const createAvaliacao = async (livroId, avaliacao) => {
  try {
    const mongo = await connect()
    const Info = mongo.model('info', LivroInfoSchema)
    const info = await Info.findOne(
      { livroId })
    info.avaliacoes = info.avaliacoes || []
    info.avaliacoes.push(avaliacao)
    await info.save()
  } catch (error) {
    throw error
  }
}

const deleteInfo = async (livroId) => {
  try {
    const mongo = await connect()
    const Info = mongo.model('info', LivroInfoSchema)
    await Info.deleteOne({ livroId })
  } catch (error) {
    throw error
  }
}

const deleteAvaliacao = async (livroId, index) => {
  try {
    const mongo = await connect()
    const Info = mongo.model('info', LivroInfoSchema)
    const info = await Info.findOne(
      { livroId })
    info.avaliacoes.splice(index, 1)
    await info.save()
  } catch (error) {
    throw error
  }
}

module.exports = {
  createInfo,
  getInfos,
  getInfo,
  updateInfo,
  deleteInfo,
  createAvaliacao,
  deleteAvaliacao
}
