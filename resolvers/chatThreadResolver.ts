import ChatThread from '../models/chatThreadModel';
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
    getPublicChatThreads: async (parent: any, args: any, context: ContextArg) => {
      if(!context.user) {
          throw new AuthenticationError('Not authorized');
      }
      // find all public chat threads
      return await ChatThread.find({ private: false });
    },
  },
  Chatting: {
    async thread(parent: any, args: any) {
        return await ChatThread.findById(parent.thread);
    }
  },
  Message: {
    async thread(parent: any, args: any) {
        return await ChatThread.findById(parent.thread);
    }
  },
  Mutation: {
    createChatThread: async (parent: any, args: any, context: ContextArg) => {
      if(!context.user) {
          throw new AuthenticationError('Not authorized');
      }
      try {
        const newChatThread = new ChatThread(args);
        const result = await newChatThread.save();
        const newChatting = new Chatting({thread: result._id, user: context.user._id})
        const chattingResult = await newChatting.save();
        return result;
      } catch (err: any) {
        throw new Error(err);
      }
    },
  },
};

//6261419d0cfc041b2fc7c82b

//626144afab15ec4f67cbcc41