import * as auth from "./auth";
import * as user from "./user";
import * as logout from "./logout";

export const endpoints = [
    auth.post,
    user.get,
    logout.get
];
