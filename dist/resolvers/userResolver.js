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
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../models/userModel"));
const auth_1 = require("../utils/auth");
const apollo_server_express_1 = require("apollo-server-express");
exports.default = {
    Query: {
        getUserById: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (!context.user) {
                throw new apollo_server_express_1.AuthenticationError('Not authorized');
            }
            // find user by id
            return yield userModel_1.default.findById(args.id);
        }),
        login: (parent, args, { req }) => __awaiter(void 0, void 0, void 0, function* () {
            // get username and password from query
            // and add to req.body for passport
            req.body = args;
            return yield (0, auth_1.login)(req);
        }),
        getUserByUsername: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (!context.user) {
                throw new apollo_server_express_1.AuthenticationError('Not authorized');
            }
            // find user by username
            return yield userModel_1.default.findOne({ username: args.username });
        }),
        getAllUsers: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (!context.user) {
                throw new apollo_server_express_1.AuthenticationError('Not authorized');
            }
            // find all users
            return yield userModel_1.default.find();
        }),
    },
    Mutation: {
        registerUser: (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const hash = yield bcrypt_1.default.hash(args.password, 12);
                const userWithHash = Object.assign(Object.assign({}, args), { password: hash });
                const newUser = new userModel_1.default(userWithHash);
                const result = yield newUser.save();
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        }),
    },
};
//625fdc5dd6abe2287efe8051
//# sourceMappingURL=userResolver.js.map