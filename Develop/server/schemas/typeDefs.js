const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    bookcount: Int
    savedbooks: [Book]
  }

  type Book {
    bookId: ID!
    author: [String]
    description: String
    image: String
    link: String
    title: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  input BookInput {
    author: [String]
    description: String
    image: String
    link: String
    title: String!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookdate: BookInput!): User
    deleteBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
