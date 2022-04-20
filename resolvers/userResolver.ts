import bcrypt from 'bcrypt';
import User from '../models/userModel';
import { login } from '../utils/auth';

interface User extends Express.User {
    _id: String,
    username: String,
    password: String,
}

interface UserArg {
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
    user: async (parent: any, args: any, { user }: UserArg) => {
      console.log('userResolver', user);
      // find user by id
      return await User.findById(args.id);
    },
    login: async (parent: any, args: any, { req }: ReqArg) => {
      // get username and password from query
      // and add to req.body for passport
      req.body = args;
      return await login(req);
    },
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

//625fdc5dd6abe2287efe8051