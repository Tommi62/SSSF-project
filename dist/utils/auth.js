"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.checkAuth = void 0;
const config_1 = require("./../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const pass_1 = __importDefault(require("./pass"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const login = (req) => {
    console.log(req.body);
    return new Promise((resolve, reject) => {
        pass_1.default.authenticate('local', { session: false }, (err, user, info) => {
            console.log('login', err, user, info);
            if (err || !user) {
                reject('Wrong username or password');
            }
            req.login(user, { session: false }, (err) => {
                if (err) {
                    reject(err);
                }
                const token = jsonwebtoken_1.default.sign(req.user, config_1.jwtConstants.secret);
                resolve(Object.assign(Object.assign({}, user), { token, id: user._id }));
            });
        })(req);
    });
};
exports.login = login;
// dummy function to check authentication (irl: e.g. passport-jwt)
const checkAuth = (req) => {
    return new Promise((resolve) => {
        pass_1.default.authenticate('jwt', (err, user) => {
            if (err || !user) {
                resolve(false);
            }
            resolve(user);
        })(req);
    });
};
exports.checkAuth = checkAuth;
//# sourceMappingURL=auth.js.map