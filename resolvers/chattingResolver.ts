import Chatting from '../models/chattingModel';
import ChatThread from '../models/chatThreadModel';
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
      return await Chatting.find({ user: context.user._id });
    },
    getUsersByThreadId: async (parent: any, args: any, context: ContextArg) => {
      if(!context.user) {
          throw new AuthenticationError('Not authorized');
      }
      try {
        const chattingsByUserId = await Chatting.find({user: context.user._id});
        if (chattingsByUserId.length > 0) {
          let count = 0;
          for(let i = 0; i < chattingsByUserId.length; i++) {
            if (chattingsByUserId[i].thread.toString() === args.id) {
              count++;
            }
          }
          if (count === 0) throw new AuthenticationError('You are trying to get users of a thread you are not included in!');
        } else {
          throw new AuthenticationError('You are trying to get users of a thread you are not included in!');
        }
        // find users of given chat thread
        return await Chatting.find({ thread: args.id });
      } catch (err: any) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    createChatting: async (parent: any, args: any, context: ContextArg) => {
      if(!context.user) {
          throw new AuthenticationError('Not authorized');
      }
      try {
        const chatThread = await ChatThread.findById(args.thread);
        if(chatThread.private) {
          const chattingsByUserId = await Chatting.find({user: context.user._id});
          if (chattingsByUserId.length > 0) {
            let count = 0;
            for(let i = 0; i < chattingsByUserId.length; i++) {
              if (chattingsByUserId[i].thread.toString() === args.thread) {
                count++;
              }
            }
            if (count === 0) throw new AuthenticationError('You are trying to add user to private thread you are not included in!');
          } else {
            throw new AuthenticationError('You are trying to add user to private thread you are not included in!');
          }
        }
        const newChatting = new Chatting(args);
        const result = await newChatting.save();
        return result;
      } catch (err: any) {
        throw new Error(err);
      }
    },
    deleteChatting: async (parent: any, args: any, context: ContextArg) => {
      if(!context.user) {
          throw new AuthenticationError('Not authorized');
      }
      try {
        return await Chatting.deleteOne({thread: args.thread, user: context.user._id});
      } catch (err: any) {
        throw new Error(err);
      }
    },
  },
};