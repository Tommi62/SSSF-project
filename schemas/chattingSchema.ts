import {gql} from 'apollo-server-express';

export default gql`
  extend type Query {
    getChatThreadsByUserId: [Chatting]
    getUsersByThreadId(id: ID!): [Chatting]
  }
  
  extend type Mutation {
    createChatting(
      thread: ID!,
      user: ID!
    ): Chatting,
    deleteChatting(thread: ID!): Chatting
  }
  
  type Chatting {
    id: ID,
    thread: ChatThread,
    user: User,
  }
`;