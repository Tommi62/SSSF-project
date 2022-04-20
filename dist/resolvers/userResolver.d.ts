/// <reference types="passport" />
/// <reference types="express-serve-static-core" />
import User from '../models/userModel';
interface User extends Express.User {
    _id: String;
    username: String;
    password: String;
}
interface UserArg {
    user: User;
}
interface AuthRequest extends Express.Request {
    body: {
        username: String;
        password: String;
    };
    user: User | undefined;
}
interface ReqArg {
    req: AuthRequest;
}
declare const _default: {
    Query: {
        user: (parent: any, args: any, { user }: UserArg) => Promise<any>;
        login: (parent: any, args: any, { req }: ReqArg) => Promise<unknown>;
    };
    Mutation: {
        registerUser: (parent: any, args: any) => Promise<any>;
    };
};
export default _default;
