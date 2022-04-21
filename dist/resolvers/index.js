"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chatThreadResolver_1 = __importDefault(require("./chatThreadResolver"));
const chattingResolver_1 = __importDefault(require("./chattingResolver"));
const messageResolver_1 = __importDefault(require("./messageResolver"));
const userResolver_1 = __importDefault(require("./userResolver"));
exports.default = [
    userResolver_1.default,
    chatThreadResolver_1.default,
    messageResolver_1.default,
    chattingResolver_1.default
];
//# sourceMappingURL=index.js.map