import { jwtConstants } from './../config';
import jwt from 'jsonwebtoken';
import passport from './pass';
import dotenv from 'dotenv';

dotenv.config();

interface User extends Express.User {
    _id: String,
    username: String,
    password: String,
}

interface Info {
    message: String
}

interface AuthRequest extends Express.Request {
    body: {
        username: String,
        password: String,
    }
    user: User | undefined,
}

const login = (req: AuthRequest) => {
  console.log(req.body);
  return new Promise((resolve, reject) => {
    passport.authenticate('local', { session: false }, (err: Error, user: User, info: Info) => {
      console.log('login', err, user, info);
      if (err || !user) {
        reject(info.message);
      }
      req.login(user, { session: false }, (err: Error) => {
        if (err) {
          reject(err);
        }
        const token = jwt.sign(req.user!, jwtConstants.secret!);
        resolve({ ...user, token, id: user._id });
      });
    })(req);
  });
};

// dummy function to check authentication (irl: e.g. passport-jwt)
const checkAuth = (req: AuthRequest) => {
  return new Promise((resolve) => {
    passport.authenticate('jwt', (err: Error, user: User) => {
      if (err || !user) {
        resolve(false);
      }
      resolve(user);
    })(req);
  });
};

export { checkAuth, login };
