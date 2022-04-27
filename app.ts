import express from 'express';
import expressWs, { WebsocketMethod } from 'express-ws';
import { WebSocket } from 'ws';
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

    const { app, getWss, applyTo } = expressWs(express());

    interface threadsArray {
      thread_id: string,
    }
    
    interface clientArray {
      user_id: number,
      threads: threadsArray[],
      client: WebSocket,
    }
    
    let clients: Array<clientArray> = [];

    app.ws('/', (ws, req) => {
      ws.on('message', (message: String) => {
        if (message.toString() !== 'pong') {
          const clientMessage = JSON.parse(message.toString())
    
          if (clientMessage.type === 'client') {
            console.log('Threads: ', clientMessage.threads)
            const clientObject = {
              user_id: clientMessage.user_id,
              threads: clientMessage.threads,
              client: ws,
            }
            clients.push(clientObject)
          } else {
            for (let i = clients.length - 1; i > -1; i--) {
              if (clientMessage.type === 'newThread') {
                const threadIdObject = {
                  thread_id: clientMessage.thread_id
                }
                if (clients[i].user_id === clientMessage.user2_id) {
                  clients[i].threads.push(threadIdObject);
                } else if (clients[i].user_id === clientMessage.user_id) {
                  clients[i].threads.push(threadIdObject);
                }
              }
              if (clients[i].client.readyState === 3) {
                clients.splice(i, 1);
              } else {
                for (let j = 0; j < clients[i].threads.length; j++) {
                  if (clients[i].threads[j].thread_id === clientMessage.thread_id) {
                    console.log('USERIDCLIENT: ', clients[i].user_id)
                    console.log('CONNECTION:', clients[i].client.readyState)
                    clients[i].client.send(message.toString())
                  }
                }
              }
            }
          }
        } else {
          setTimeout(() => ws.send('ping'), 1000);
        }
      });
      ws.send('ping') //loop start
  });

    await server.start();

    server.applyMiddleware({ app });

    app.listen({ port: process.env.PORT || 3001 }, () =>
      console.log(
        `🚀 Server ready at http://localhost:3001${server.graphqlPath}`
      )
    );
  } catch (e: any) {
    console.log('server error: ' + e.message);
  }
})();
