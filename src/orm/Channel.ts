import { Long } from "mongodb";

export interface Channel {
    _id: Long;
    name: string;
    description: string;
}
