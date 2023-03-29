const Autor = require('../models/autor.model')

const createAutor = async (autor) => await Autor.create(autor)
const getAutor = async (autorId) => await Autor.findByPk(autorId)
const getAutors = async () => await Autor.findAll({})
const deleteAutor = async (autorId) => await Autor.destroy({ where: { autor_id: autorId } })
const updateAutor = async (autor) => {
  const { autor_id } = autor
  delete autor.autor_id
  await Autor.update(autor, { where: { autor_id } })
  return await getAutor(autor.autor_id)
}

module.exports = {
  createAutor,
  getAutor,
  getAutors,
  deleteAutor,
  updateAutor
}
