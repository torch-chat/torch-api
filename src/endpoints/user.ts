import { Long } from "mongodb";
import { Endpoint } from "../interface";
import { User } from "../orm";

export const get = {
    path: "/user/:id",
    method: "get",
    params: {
        id: {
            required: true,
            notNull: true
        }
    },
    handler: (gl) => async (req, res) => {
        const user = await gl.db.collection<User>("users").findOne<{ username: string }>({ _id: Long.fromString(req.params.id) }, { projection: { _id: 0, username: 1 } });
        if (!user) return res.sendStatus(404);
        res.status(200).json({
            id: req.params.id,
            ...user
        });
    }
} as Endpoint;
