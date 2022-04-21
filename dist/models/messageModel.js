"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const messageSchema = new Schema({
    contents: { type: String, required: true },
    timestamp: { type: String, required: true },
    status: { type: String, default: 'unseen' },
    thread: { type: mongoose_1.default.Types.ObjectId, ref: 'ChatThread', required: true },
    user: { type: mongoose_1.default.Types.ObjectId, ref: 'User', required: true },
});
exports.default = mongoose_1.default.model('Message', messageSchema);
//# sourceMappingURL=messageModel.js.map