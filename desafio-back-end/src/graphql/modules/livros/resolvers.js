import Livros from '../../../models/Livros'

export default {
  Query: {
    listaLivros: () => Livros.find(),
    buscaLivro: (_, { id }) => Livros.findById(id)
  },
  Mutation: {
    createLivro: async (_, { data }) => {
      const livro = await Livros.create(data)
      return livro
    },
    updateLivro: (_, { id, data }) =>
      Livros.findOneAndUpdate(id, data, { new: true }),
    deletaLivro: async (_, { id }) => !!(await Livros.findOneAndDelete(id))
  }
}
