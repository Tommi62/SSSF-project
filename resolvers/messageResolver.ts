import Message from '../models/messageModel';
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
    getMessagesByThreadId: async (parent: any, args: any, context: ContextArg) => {
      if(!context.user) {
          throw new AuthenticationError('Not authorized');
      }
      // find all messages that have given id as thread_id
      return await Message.find({ thread: args.id });
    },
  },
  Mutation: {
    postMessage: async (parent: any, args: any, context: ContextArg) => {
      if(!context.user) {
          throw new AuthenticationError('Not authorized');
      }
      try {
        const isUserInThisThread = await Chatting.find({thread: args.thread, user: context.user._id,});
        if (isUserInThisThread.length === 0) {
            throw new AuthenticationError('You are not included in this thread');
        }
        const newMessage = new Message(args);
        const result = await newMessage.save();
        return result;
      } catch (err: any) {
        throw new Error(err);
      }
    },
  },
};