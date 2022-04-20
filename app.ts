import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schemas/index';
import resolvers from './resolvers/index';
import dotenv from 'dotenv';
import connectMongo from './db/db';
import { checkAuth } from './utils/auth';

dotenv.config();

interface User extends Express.User {
    _id: String,
    username: String,
    password: String,
}

interface AuthRequest extends Express.Request {
    body: {
        username: String,
        password: String,
    }
    user: User | undefined,
}

interface Context {
    req: AuthRequest,
}

(async () => {
  try {
    const conn = await connectMongo();
    if (conn) {
      console.log('Connected successfully.');
    } else {
      throw new Error('db not connected');
    }

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req }: Context) => {
        if (req) {
          const user = await checkAuth(req);
          return { user, req };
        }
      },
    });

    const app = express();

    await server.start();

    server.applyMiddleware({ app });

    app.listen({ port: process.env.PORT || 3000 }, () =>
      console.log(
        `🚀 Server ready at http://localhost:3000${server.graphqlPath}`
      )
    );
  } catch (e: any) {
    console.log('server error: ' + e.message);
  }
})();
