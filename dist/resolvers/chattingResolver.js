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
const chattingModel_1 = __importDefault(require("../models/chattingModel"));
const apollo_server_express_1 = require("apollo-server-express");
exports.default = {
    Query: {
        getChatThreadsByUserId: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (!context.user) {
                throw new apollo_server_express_1.AuthenticationError('Not authorized');
            }
            // find given user's chat threads
            return yield chattingModel_1.default.find({ user: args.id });
        }),
    },
    Mutation: {
        createChatting: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (!context.user) {
                throw new apollo_server_express_1.AuthenticationError('Not authorized');
            }
            try {
                const newChatting = new chattingModel_1.default(args);
                const result = yield newChatting.save();
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        }),
    },
};
//# sourceMappingURL=chattingResolver.js.map