import bcrypt from 'bcrypt';
import User from '../models/userModel';
import { login } from '../utils/auth';
import { AuthenticationError } from 'apollo-server-express';

interface User extends Express.User {
    _id: String,
    username: String,
    password: String,
}

interface ContextArg {
    user: User,
}

interface AuthRequest extends Express.Request {
    body: {
        username: String,
        password: String,
    }
    user: User | undefined,
}

interface ReqArg {
    req: AuthRequest,
}

export default {
  Query: {
    getUserById: async (parent: any, args: any, context: ContextArg) => {
      if(!context.user) {
          throw new AuthenticationError('Not authorized');
      }
      // find user by id
      return await User.findById(args.id);
    },
    login: async (parent: any, args: any, { req }: ReqArg) => {
      // get username and password from query
      // and add to req.body for passport
      req.body = args;
      return await login(req);
    },
    getUserByUsername: async (parent: any, args: any, context: ContextArg) => {
        // find user by username
        return await User.findOne({username: args.username});
    },
    getAllUsers: async (parent: any, args: any, context: ContextArg) => {
      if(!context.user) {
          throw new AuthenticationError('Not authorized');
      }
      // find all users
      return await User.find();
    },
    getLoggedInUser: async (parent: any, args: any, context: ContextArg) => {
      if(!context.user) {
          throw new AuthenticationError('Not authorized');
      }
      // find all users
      return { id: context.user._id, username: context.user.username };
    },
  },
  Chatting: {
    async user(parent: any, args: any) {
        return await User.findById(parent.user);
    }
  },
  Message: {
    async user(parent: any, args: any) {
        return await User.findById(parent.user);
    }
  },
  ChatThread: {
    async creator(parent: any, args: any) {
        return await User.findById(parent.creator);
    }
  },
  Mutation: {
    registerUser: async (parent: any, args: any) => {
      try {
        const hash = await bcrypt.hash(args.password, 12);
        const userWithHash = {
          ...args,
          password: hash,
        };
        const newUser = new User(userWithHash);
        const result = await newUser.save();
        return result;
      } catch (err: any) {
        throw new Error(err);
      }
    },
  },
};