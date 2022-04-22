"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = (0, apollo_server_express_1.gql) `
  extend type Query {
    getUserById(id: ID!): User
    login(username: String!, password: String!): User
    getUserByUsername(username: String!): User
    getAllUsers: [User]
    getLoggedInUser: User
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
//# sourceMappingURL=userSchema.js.map