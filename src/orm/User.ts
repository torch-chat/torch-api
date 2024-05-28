import { Long } from "mongodb";

export interface User {
    _id: Long;
    username: string;
    password: string;
}
