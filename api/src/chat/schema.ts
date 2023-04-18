import { buildSchema } from 'graphql'

export default buildSchema(`
  type Query {
    askQuestion(question:String!): String!
  }
`)
