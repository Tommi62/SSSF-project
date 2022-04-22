"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = (0, apollo_server_express_1.gql) `
  extend type Query {
    getPublicChatThreads: [ChatThread]
  }
  
  extend type Mutation {
    createChatThread(
      name: String!,
      private: Boolean!
    ): ChatThread
  }
  
  type ChatThread {
    id: ID
    name: String,
    private: Boolean,
    creator: User
  }
`;
//# sourceMappingURL=chatThreadSchema.js.map