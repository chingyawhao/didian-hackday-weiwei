import { buildSchema } from 'graphql'

export default buildSchema(`
  type Query {
    askQuestion(histories: [Chat!]!): String!
  }
  input Chat {
    role: String!
    content: String!
  }
`)
