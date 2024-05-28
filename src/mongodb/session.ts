import { Long, ObjectId } from "mongodb";
import { Globals } from "../interface";
import { Session } from "../orm";
import { sessionKey, snowflake } from "../util";
import { AcknowledgeException } from "../exceptions/AcknowledgeException";

export async function createSession(gl: Globals, userId: Long): Promise<Session> {
    const _id = snowflake();
    const key = sessionKey();
    const result = await gl.db.collection("sessions").insertOne({
        "_id": _id as unknown as ObjectId,
        "userId": userId,
        "key": key
    });
    if (!result.acknowledged) throw new AcknowledgeException("session creation not acknowledged");
    return {
        _id,
        userId,
        key
    };
}

export async function invalidateSession(gl: Globals, key: string): Promise<void> {
    const result = await gl.db.collection("sessions").deleteOne({ "key": key });
    if (!result.acknowledged) throw new AcknowledgeException("session invalidation not acknowledged");
}
