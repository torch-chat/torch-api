import { Express } from "express";
import { Long } from "mongodb";
import { Globals } from "../interface";
import { User } from "../orm";
import { validate } from "../util";

export default (app: Express, gl: Globals) => {
    app.get("/user/:id", validate({
        params: {
            id: {
                required: true,
                notNull: true
            }
        }
    }), async (req, res) => {
        const user = await gl.db.collection<User>("users").findOne<{ username: string }>({ _id: Long.fromString(req.params.id) }, { projection: { _id: 0, username: 1 } });
        if (!user) return res.sendStatus(404);
        res.status(200).json({
            id: req.params.id,
            ...user
        });
    });
};
