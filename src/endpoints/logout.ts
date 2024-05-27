import { Express } from "express";
import { Globals } from "../interface";
import { invalidateSession } from "../mongodb";

export default (app: Express, gl: Globals) => {
    app.get("/logout", async (req, res) => {
        if (Object.prototype.hasOwnProperty.call(req.cookies, "session"))
            await invalidateSession(gl, req.cookies.session);
        res.sendStatus(200);
    });
};
