const { ApolloServer, gql } = require('apollo-server')

// Toda request é POST
// Toda request bate no MESMO endpoint (/graphql)

// Query -> Obter informações (GET)
// Mutation -> Munipular dados (POST PUT PATCH DELETE)
// Scalar types -> String Int Boolean Float e ID

// ! atributos obrigatorios
/**
 query {
   posts {
     title
     author {
       name
       email
       active
     }
   }
 }
 */
const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    active: Boolean!
  }

  type Post {
    _id: ID!
    title: String!
    content: String!
    author: User!
  }

  type Query {
    hello: String
    users: [User!]!
    getUSerByEmail(email: String!): User!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
  }
`
const users = [
  {
    _id: '1',
    name: 'Bruno',
    email: 'email',
    active: true
  },
  {
    _id: '2',
    name: 'Bruno2',
    email: 'email2',
    active: false
  },
  {
    _id: '3',
    name: 'Bruno3',
    email: 'email3',
    active: true
  }
]

const resolvers = {
  Query: {
    hello: () => 'Ola',
    users: () => users,
    getUSerByEmail: (_, args) => {
      return users.find(user => user.email === args.email)
    }
  },
  Mutation: {
    createUser: (_, args) => {
      const newUser = {
        _id: String(Math.random()),
        name: args.name,
        email: args.email,
        active: true
      }

      users.push(newUser)
      return newUser
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => console.log(`Server on ${url}`))
