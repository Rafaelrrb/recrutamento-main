const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
  type Livros {
    _id: ID!
    name: String!
    autor: String!
  }

  type Query {
    listaLivros: [Livros!]!
    buscaLivro(_id: ID, name: String): Livros!
  }

  type Mutation {
    createLivro(name: String!, autor: String!): Livros!
    alteraLivro(_id: ID!, name: String, autor: String): Livros!
    deletarLivro(_id: ID!): Boolean
  }
`
let livraria = [
  {
    _id: '1',
    name: 'Livro A',
    autor: 'Autor A'
  },
  {
    _id: '2',
    name: 'Livro B',
    autor: 'Autor A'
  },
  {
    _id: '3',
    name: 'Livro C',
    autor: 'Autor B'
  }
]

const resolvers = {
  Query: {
    listaLivros: () => livraria,
    buscaLivro: (_, args) => {
      return livraria.find(
        livro => livro.name == args.name || livro._id === args._id
      )
    }
  },
  Mutation: {
    createLivro: (_, args) => {
      const newLivro = {
        _id: String(Math.random()),
        name: args.name,
        autor: args.autor
      }

      livraria.push(newLivro)
      return newLivro
    },
    alteraLivro: (_, args) => {
      const livro = livraria.find(livro => livro._id === args._id)
      const indice = livraria.findIndex(livro => livro._id === args._id)

      const mudaLivro = {
        ...livro,
        ...args
      }

      livraria.splice(indice, 1, mudaLivro)
      return mudaLivro
    },

    deletarLivro: (_, args) => {
      const deletar = livraria.find(livro => livro._id === args._id)

      livraria = livraria.filter(livro => livro._id !== args._id)

      return !!deletar
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => console.log(`Server on ${url}`))
