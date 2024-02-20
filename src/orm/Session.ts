import { Long } from "mongodb";

export interface Session {
    id: Long;
    userId: Long;
    key: string;
}
