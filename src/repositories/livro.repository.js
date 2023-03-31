/* eslint-disable camelcase */
const Livro = require('../models/livro.model')

const createLivro = async (livro) => await Livro.create(livro)

const getLivro = async (livroId) => await Livro.findByPk(livroId, { raw: true })

const getLivros = async () => await Livro.findAll({})

const getLivrosFromAutor = async (autor_id) => await Livro.findAll({ where: { autor_id } })

const deleteLivro = async (livroId) => await Livro.destroy({ where: { livro_id: livroId } })

const updateLivro = async (livro) => {
  await Livro.update(livro, { where: { livro_id: livro.livro_id } })
  return await getLivro(livro.livro_id)
}

module.exports = {
  createLivro,
  getLivro,
  getLivros,
  getLivrosFromAutor,
  deleteLivro,
  updateLivro
}
