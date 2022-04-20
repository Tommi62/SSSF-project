"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
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
];
//# sourceMappingURL=index.js.map