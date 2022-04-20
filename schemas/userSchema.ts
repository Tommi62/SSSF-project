import {gql} from 'apollo-server-express';

export default gql`
  extend type Query {
    getUserById(id: ID!): User
    login(username: String!, password: String!): User
    getUserByUsername(username: String!): User
    getAllUsers: [User]
  }
  
  extend type Mutation {
    registerUser(
      username: String!,
      password: String!,
    ): User
  }
  
  type User {
    id: ID
    username: String,
    token: String
  }
`;