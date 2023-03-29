const Livro = require('../models/livro.model')

const createLivro = async (livro) => await Livro.create(livro)
const getLivro = async (livroId) => await Livro.findByPk(livroId)
const getLivros = async () => await Livro.findAll({})
const deleteLivro = async (livroId) => await Livro.destroy({ where: { livro_id: livroId } })
const updateLivro = async (livro) => {
  const { livro_id } = livro
  delete livro.livro_id
  await Livro.update(livro, { where: { livro_id } })
  return await getLivro(livro.livro_id)
}

module.exports = {
  createLivro,
  getLivro,
  getLivros,
  deleteLivro,
  updateLivro
}
