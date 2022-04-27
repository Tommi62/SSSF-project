'use strict';
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
const config_1 = require("./../config");
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const passport_jwt_1 = require("passport-jwt");
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
passport_1.default.use(new passport_local_1.Strategy((username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    // get user by username (in this case email) from userModel/getUserLogin
    const user = yield userModel_1.default.findOne({ username });
    // if user is undefined
    if (!user) {
        return done(null, false);
    }
    // if passwords dont match
    if (!(yield bcrypt_1.default.compare(password, user.password))) {
        return done(null, false);
    }
    // if all is ok
    // convert document to object
    const strippedUser = user.toObject();
    delete strippedUser.password;
    return done(null, strippedUser);
})));
passport_1.default.use(new passport_jwt_1.Strategy({
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config_1.jwtConstants.secret,
}, (payload, done) => {
    // console.log('jwt payload', payload);
    done(null, payload);
}));
exports.default = passport_1.default;
//# sourceMappingURL=pass.js.map