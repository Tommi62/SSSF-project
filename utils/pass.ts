'use strict';
import { jwtConstants } from './../config';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/userModel';
import bcrypt from 'bcrypt';

passport.use(
  new LocalStrategy(async (username, password, done) => {
    console.log('localstrategy', username, password);
    // get user by username (in this case email) from userModel/getUserLogin
    const user = await User.findOne({ username });
    // if user is undefined
    if (!user) {
      return done(null, false);
    }
    // if passwords dont match
    if (!(await bcrypt.compare(password, user.password))) {
      return done(null, false);
    }
    // if all is ok
    // convert document to object
    const strippedUser = user.toObject();
    delete strippedUser.password;
    return done(null, strippedUser);
  })
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
    },
    (payload, done) => {
      // console.log('jwt payload', payload);
      done(null, payload);
    }
  )
);

export default passport;
