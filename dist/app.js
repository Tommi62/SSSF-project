"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_ws_1 = __importDefault(require("express-ws"));
const apollo_server_express_1 = require("apollo-server-express");
const index_1 = __importDefault(require("./schemas/index"));
const index_2 = __importDefault(require("./resolvers/index"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./db/db"));
const auth_1 = require("./utils/auth");
dotenv_1.default.config();
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield (0, db_1.default)();
        if (conn) {
            console.log('Connected successfully.');
        }
        else {
            throw new Error('db not connected');
        }
        const server = new apollo_server_express_1.ApolloServer({
            typeDefs: index_1.default,
            resolvers: index_2.default,
            context: ({ req }) => __awaiter(void 0, void 0, void 0, function* () {
                if (req) {
                    const user = yield (0, auth_1.checkAuth)(req);
                    return { user, req };
                }
            }),
        });
        const { app, getWss, applyTo } = (0, express_ws_1.default)((0, express_1.default)());
        let clients = [];
        app.ws('/', (ws, req) => {
            ws.on('message', (message) => {
                if (message.toString() !== 'pong') {
                    const clientMessage = JSON.parse(message.toString());
                    if (clientMessage.type === 'client') {
                        console.log('Threads: ', clientMessage.threads);
                        const clientObject = {
                            user_id: clientMessage.user_id,
                            threads: clientMessage.threads,
                            client: ws,
                        };
                        clients.push(clientObject);
                    }
                    else {
                        for (let i = clients.length - 1; i > -1; i--) {
                            if (clientMessage.type === 'newThread') {
                                const threadIdObject = {
                                    thread_id: clientMessage.thread_id
                                };
                                if (clients[i].user_id === clientMessage.user2_id) {
                                    clients[i].threads.push(threadIdObject);
                                }
                                else if (clients[i].user_id === clientMessage.user_id) {
                                    clients[i].threads.push(threadIdObject);
                                }
                            }
                            if (clients[i].client.readyState === 3) {
                                clients.splice(i, 1);
                            }
                            else {
                                for (let j = 0; j < clients[i].threads.length; j++) {
                                    if (clients[i].threads[j].thread_id === clientMessage.thread_id) {
                                        console.log('USERIDCLIENT: ', clients[i].user_id);
                                        console.log('CONNECTION:', clients[i].client.readyState);
                                        clients[i].client.send(message.toString());
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    setTimeout(() => ws.send('ping'), 1000);
                }
            });
            ws.send('ping'); //loop start
        });
        yield server.start();
        server.applyMiddleware({ app });
        app.listen({ port: process.env.PORT || 3001 }, () => console.log(`🚀 Server ready at http://localhost:3001${server.graphqlPath}`));
    }
    catch (e) {
        console.log('server error: ' + e.message);
    }
}))();
//# sourceMappingURL=app.js.map