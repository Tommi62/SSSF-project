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
        const app = (0, express_1.default)();
        yield server.start();
        server.applyMiddleware({ app });
        app.listen({ port: process.env.PORT || 3000 }, () => console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`));
    }
    catch (e) {
        console.log('server error: ' + e.message);
    }
}))();
//# sourceMappingURL=app.js.map