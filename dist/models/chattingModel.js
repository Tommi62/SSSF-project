"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const chattingSchema = new Schema({
    thread: { type: mongoose_1.default.Types.ObjectId, ref: 'ChatThread', required: true },
    user: { type: mongoose_1.default.Types.ObjectId, ref: 'User', required: true },
});
chattingSchema.index({
    thread: 1,
    user: 1,
}, {
    unique: true,
});
exports.default = mongoose_1.default.model('Chatting', chattingSchema);
//# sourceMappingURL=chattingModel.js.map