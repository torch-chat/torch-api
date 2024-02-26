import * as bcrypt from "bcrypt";
import { Endpoint } from "../interface";
import { User } from "../orm";
import { Long } from "mongodb";
import { createSession } from "../mongodb";

export const post = {
    path: "/auth",
    method: "post",
    body: {
        username: {
            type: "string",
            required: true,
            notNull: true
        },
        password: {
            type: "string",
            required: true,
            notNull: true
        }
    },
    handler: (gl) => async (req, res) => {
        const { username, password } = req.body as { username: string; password: string; };
        const user = await gl.db.collection<User>("users").findOne<{ _id: Long; password:string }>({ username }, { projection: { _id: 1, password: 1 } });
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.sendStatus(403);
        const session = await createSession(gl, user._id);
        res.cookie("session", session.key);
        res.sendStatus(200);
    }
} as Endpoint;
