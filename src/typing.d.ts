import { User } from "./orm";

declare global {
    namespace Express {
        export interface Request {
            env: {
                user?: User;
                loggedIn?: boolean;
            }
        }
    }
}
