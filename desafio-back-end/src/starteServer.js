import mongoose from 'mongoose'
const { ApolloServer } = require('apollo-server')

export default function startServer({ typeDefs, resolvers }) {
  mongoose.connect('mongodb://localhost:27017/graphql', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  const server = new ApolloServer({ typeDefs, resolvers })
  server.listen().then(({ url }) => console.log(`Server on ${url}`))
}
