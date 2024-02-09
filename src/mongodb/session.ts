import { Long, ObjectId } from "mongodb";
import { Context, Session } from "../interface";
import { sessionKey, snowflake } from "../util";
import { AcknowledgeException } from "../exceptions/AcknowledgeException";

export async function createSession(ctx: Context, userId: string): Promise<Session> {
    const id = snowflake();
    const key = sessionKey();
    const result = await ctx.db.collection("sessions").insertOne({
        "_id": Long.fromString(id) as unknown as ObjectId,
        "userId": userId,
        "key": key
    });
    if (!result.acknowledged) throw new AcknowledgeException("session creation not acknowledged");
    return {
        id,
        userId,
        key
    };
}

export async function invalidateSession(ctx: Context, key: string): Promise<void> {
    const result = await ctx.db.collection("sessions").deleteOne({ "key": key });
    if (!result.acknowledged) throw new AcknowledgeException("session invalidation not acknowledged");
}
