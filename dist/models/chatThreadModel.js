"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const chatThreadSchema = new Schema({
    name: { type: String, required: true },
    private: { type: Boolean, required: true },
});
exports.default = mongoose_1.default.model('ChatThread', chatThreadSchema);
//# sourceMappingURL=chatThreadModel.js.map