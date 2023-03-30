const Autor = require('../models/autor.model')

const createAutor = async (autor) => await Autor.create(autor)

const getAutor = async (autorId) => await Autor.findByPk(autorId)

const getAutorByEmail = async (email) => await Autor.findOne({ where: { email } })

const getAutores = async () => await Autor.findAll({})

const deleteAutor = async (autorId) => await Autor.destroy({ where: { autor_id: autorId } })

const updateAutor = async (autor) => {
  await Autor.update(autor, { where: { autor_id: autor.autor_id } })
  return await getAutor(autor.autor_id)
}

module.exports = {
  createAutor,
  getAutor,
  getAutorByEmail,
  getAutores,
  deleteAutor,
  updateAutor
}
