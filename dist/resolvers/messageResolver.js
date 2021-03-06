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
const messageModel_1 = __importDefault(require("../models/messageModel"));
const chattingModel_1 = __importDefault(require("../models/chattingModel"));
const apollo_server_express_1 = require("apollo-server-express");
exports.default = {
    Query: {
        getMessagesByThreadId: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (!context.user) {
                throw new apollo_server_express_1.AuthenticationError('Not authorized');
            }
            try {
                const chattingsByUserId = yield chattingModel_1.default.find({ user: context.user._id });
                if (chattingsByUserId.length > 0) {
                    let count = 0;
                    for (let i = 0; i < chattingsByUserId.length; i++) {
                        if (chattingsByUserId[i].thread.toString() === args.id) {
                            count++;
                        }
                    }
                    if (count === 0)
                        throw new apollo_server_express_1.AuthenticationError('You are trying to get messages of a thread you are not included in!');
                }
                else {
                    throw new apollo_server_express_1.AuthenticationError('You are trying to get messages of a thread you are not included in!');
                }
                // find all messages that have given id as thread_id
                if (args.messageLimit === 0)
                    return yield messageModel_1.default.find({ thread: args.id });
                return yield messageModel_1.default.find({ thread: args.id }).limit(args.messageLimit);
            }
            catch (err) {
                throw new Error(err);
            }
        }),
        getLastMessageByThreadId: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (!context.user) {
                throw new apollo_server_express_1.AuthenticationError('Not authorized');
            }
            try {
                const chattingsByUserId = yield chattingModel_1.default.find({ user: context.user._id });
                if (chattingsByUserId.length > 0) {
                    let count = 0;
                    for (let i = 0; i < chattingsByUserId.length; i++) {
                        if (chattingsByUserId[i].thread.toString() === args.id) {
                            count++;
                        }
                    }
                    if (count === 0)
                        throw new apollo_server_express_1.AuthenticationError('You are trying to get messages of a thread you are not included in!');
                }
                else {
                    throw new apollo_server_express_1.AuthenticationError('You are trying to get messages of a thread you are not included in!');
                }
                // find all messages that have given id as thread_id
                return yield messageModel_1.default.find({ thread: args.id }).limit(1).sort({ _id: -1 });
            }
            catch (err) {
                throw new Error(err);
            }
        }),
    },
    Mutation: {
        postMessage: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (!context.user) {
                throw new apollo_server_express_1.AuthenticationError('Not authorized');
            }
            try {
                const isUserInThisThread = yield chattingModel_1.default.find({ thread: args.thread, user: context.user._id, });
                if (isUserInThisThread.length === 0) {
                    throw new apollo_server_express_1.AuthenticationError('You are not included in this thread');
                }
                const newMessage = new messageModel_1.default(Object.assign(Object.assign({}, args), { user: context.user._id }));
                const result = yield newMessage.save();
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        }),
        deleteMessage: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (!context.user) {
                throw new apollo_server_express_1.AuthenticationError('Not authorized');
            }
            try {
                const message = yield messageModel_1.default.findById(args.id);
                if (message.user.toString() !== context.user._id) {
                    throw new apollo_server_express_1.AuthenticationError('You can only delete your own messages!');
                }
                return messageModel_1.default.findByIdAndDelete(args.id);
            }
            catch (err) {
                throw new Error(err);
            }
        }),
    },
};
//# sourceMappingURL=messageResolver.js.map