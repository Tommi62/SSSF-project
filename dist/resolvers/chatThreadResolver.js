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
const chatThreadModel_1 = __importDefault(require("../models/chatThreadModel"));
const chattingModel_1 = __importDefault(require("../models/chattingModel"));
const apollo_server_express_1 = require("apollo-server-express");
exports.default = {
    Query: {
        getPublicChatThreads: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (!context.user) {
                throw new apollo_server_express_1.AuthenticationError('Not authorized');
            }
            // find all public chat threads
            return yield chatThreadModel_1.default.find({ private: false });
        }),
    },
    Chatting: {
        thread(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield chatThreadModel_1.default.findById(parent.thread);
            });
        }
    },
    Message: {
        thread(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield chatThreadModel_1.default.findById(parent.thread);
            });
        }
    },
    Mutation: {
        createChatThread: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (!context.user) {
                throw new apollo_server_express_1.AuthenticationError('Not authorized');
            }
            try {
                const newChatThread = new chatThreadModel_1.default(Object.assign(Object.assign({}, args), { creator: context.user._id }));
                const result = yield newChatThread.save();
                const newChatting = new chattingModel_1.default({ thread: result._id, user: context.user._id });
                const chattingResult = yield newChatting.save();
                return result;
            }
            catch (err) {
                throw new Error(err);
            }
        }),
    },
};
//6261419d0cfc041b2fc7c82b
//626144afab15ec4f67cbcc41
//626280fc800af36f3a5451ba
//# sourceMappingURL=chatThreadResolver.js.map