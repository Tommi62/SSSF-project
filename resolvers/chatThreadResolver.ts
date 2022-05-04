import ChatThread from '../models/chatThreadModel';
import Chatting from '../models/chattingModel';
import Message from '../models/messageModel';
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
        const newChatThread = new ChatThread({ ...args, creator: context.user._id });
        const result = await newChatThread.save();
        const newChatting = new Chatting({thread: result._id, user: context.user._id})
        await newChatting.save();
        return result;
      } catch (err: any) {
        throw new Error(err);
      }
    },
    deleteChatThread: async (parent: any, args: any, context: ContextArg) => {
      if(!context.user) {
          throw new AuthenticationError('Not authorized');
      }
      try {
        const chatThread = await ChatThread.findById(args.id);
        if (chatThread.creator.toString() !== context.user._id) {
          throw new AuthenticationError('You can only delete chat threads which you have created!');
        }
        const deleteThread = await ChatThread.findByIdAndDelete(args.id);
        await Chatting.deleteMany({thread: args.id});
        await Message.deleteMany({thread: args.id});
        return deleteThread;
      } catch (err: any) {
        throw new Error(err);
      }
    },
    modifyChatThread: async (parent: any, args: any, context: ContextArg) => {
      if(!context.user) {
          throw new AuthenticationError('Not authorized');
      }
      try {
        const chatThread = await ChatThread.findById(args.id);
        if (chatThread.creator.toString() !== context.user._id) {
          throw new AuthenticationError('You can only modify chat threads which you have created!');
        }
        return await ChatThread.findByIdAndUpdate(args.id, args, {new: true});
      } catch (err: any) {
        throw new Error(err);
      }
    },
  },
};

//6261419d0cfc041b2fc7c82b

//626144afab15ec4f67cbcc41

//626280fc800af36f3a5451ba