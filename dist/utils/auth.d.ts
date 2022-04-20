/// <reference types="express-serve-static-core" />
/// <reference types="passport" />
interface User extends Express.User {
    _id: String;
    username: String;
    password: String;
}
interface AuthRequest extends Express.Request {
    body: {
        username: String;
        password: String;
    };
    user: User | undefined;
}
declare const login: (req: AuthRequest) => Promise<unknown>;
declare const checkAuth: (req: AuthRequest) => Promise<unknown>;
export { checkAuth, login };
