import { Long } from "mongodb";

export interface User {
    id: Long;
    username: string;
    password: string;
    email?: string;
}
