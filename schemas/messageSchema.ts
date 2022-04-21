import {gql} from 'apollo-server-express';

export default gql`
  extend type Query {
    getMessagesByThreadId(id: ID!): [Message]
  }
  
  extend type Mutation {
    postMessage(
      contents: String!,
      timestamp: String!,
      status: String,
      thread: ID!,
      user: ID!
    ): Message
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