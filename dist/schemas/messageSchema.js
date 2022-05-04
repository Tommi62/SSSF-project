"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = (0, apollo_server_express_1.gql) `
  extend type Query {
    getMessagesByThreadId(id: ID!, messageLimit: Int!): [Message]
    getLastMessageByThreadId(id: ID!): [Message]
  }
  
  extend type Mutation {
    postMessage(
      contents: String!,
      timestamp: String!,
      status: String,
      thread: ID!,
    ): Message,
    deleteMessage(id: ID!): Message
  }
  
  type Message {
    id: ID
    contents: String,
    timestamp: String,
    status: String,
    thread: ChatThread,
    user: User,
  }
`;
//# sourceMappingURL=messageSchema.js.map