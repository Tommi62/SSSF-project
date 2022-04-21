import {gql} from 'apollo-server-express';

export default gql`
  extend type Query {
    getPublicChatThreads: [ChatThread]
  }
  
  extend type Mutation {
    createChatThread(
      name: String!,
      private: Boolean!,
    ): ChatThread
  }
  
  type ChatThread {
    id: ID
    name: String,
    private: Boolean
  }
`;