import Chatting from '../models/chattingModel';
import { AuthenticationError } from 'apollo-server-express';

interface User extends Express.User {
    _id: String,
    username: String,
    password: String,
}

interface ContextArg {
    user: User,
}

export default {
  Query: {
    getChatThreadsByUserId: async (parent: any, args: any, context: ContextArg) => {
      if(!context.user) {
          throw new AuthenticationError('Not authorized');
      }
      // find given user's chat threads
      return await Chatting.find({ user: args.id });
    },
  },
  Mutation: {
    createChatting: async (parent: any, args: any, context: ContextArg) => {
      if(!context.user) {
          throw new AuthenticationError('Not authorized');
      }
      try {
        const newChatting = new Chatting(args);
        const result = await newChatting.save();
        return result;
      } catch (err: any) {
        throw new Error(err);
      }
    },
  },
};