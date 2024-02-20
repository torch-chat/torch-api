import { Long, ObjectId } from "mongodb";
import { Globals, Session } from "../interface";
import { sessionKey, snowflake } from "../util";
import { AcknowledgeException } from "../exceptions/AcknowledgeException";

export async function createSession(gl: Globals, userId: Long): Promise<Session> {
    const id = snowflake();
    const key = sessionKey();
    const result = await gl.db.collection("sessions").insertOne({
        "_id": id as unknown as ObjectId,
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

export async function invalidateSession(gl: Globals, key: string): Promise<void> {
    const result = await gl.db.collection("sessions").deleteOne({ "key": key });
    if (!result.acknowledged) throw new AcknowledgeException("session invalidation not acknowledged");
}
