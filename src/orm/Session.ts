import { Long } from "mongodb";

export interface Session {
    _id: Long;
    userId: Long;
    key: string;
}
