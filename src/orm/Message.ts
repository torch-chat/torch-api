import { Long } from "mongodb";

export interface Message {
    _id: Long;
    userId: Long;
    channelId: Long;
    content: string;
}
