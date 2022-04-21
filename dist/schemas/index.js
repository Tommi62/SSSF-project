"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const chatThreadSchema_1 = __importDefault(require("./chatThreadSchema"));
const chattingSchema_1 = __importDefault(require("./chattingSchema"));
const messageSchema_1 = __importDefault(require("./messageSchema"));
const userSchema_1 = __importDefault(require("./userSchema"));
const linkSchema = (0, apollo_server_express_1.gql) `
   type Query {
     _: Boolean
   }
   type Mutation {
     _: Boolean
   }
`;
exports.default = [
    linkSchema,
    userSchema_1.default,
    chatThreadSchema_1.default,
    messageSchema_1.default,
    chattingSchema_1.default
];
//# sourceMappingURL=index.js.map