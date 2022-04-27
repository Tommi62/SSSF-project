import Message from '../models/messageModel';
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
    getMessagesByThreadId: async (parent: any, args: any, context: ContextArg) => {
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
          if (count === 0) throw new AuthenticationError('You are trying to get messages of a thread you are not included in!');
        } else {
          throw new AuthenticationError('You are trying to get messages of a thread you are not included in!');
        }
        // find all messages that have given id as thread_id
        if (args.messageLimit === 0) return await Message.find({ thread: args.id });
        return await Message.find({ thread: args.id }).limit(args.messageLimit);
      } catch (err: any) {
        throw new Error(err);
      }
    },
    getLastMessageByThreadId: async (parent: any, args: any, context: ContextArg) => {
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
          if (count === 0) throw new AuthenticationError('You are trying to get messages of a thread you are not included in!');
        } else {
          throw new AuthenticationError('You are trying to get messages of a thread you are not included in!');
        }
        // find all messages that have given id as thread_id
        return await Message.find({ thread: args.id }).limit(1).sort({ _id: -1 });
      } catch (err: any) {
        throw new Error(err);
      }
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
        const newMessage = new Message({...args, user: context.user._id});
        const result = await newMessage.save();
        return result;
      } catch (err: any) {
        throw new Error(err);
      }
    },
  },
};