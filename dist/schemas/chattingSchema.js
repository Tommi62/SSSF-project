"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = (0, apollo_server_express_1.gql) `
  extend type Query {
    getChatThreadsByUserId(id: ID!): [Chatting]
  }
  
  extend type Mutation {
    createChatting(
      thread: ID!,
      user: ID!
    ): Chatting
  }
  
  type Chatting {
    id: ID,
    thread: ChatThread,
    user: User,
  }
`;
//# sourceMappingURL=chattingSchema.js.map