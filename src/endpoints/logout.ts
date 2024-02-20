import { Endpoint } from "../interface";
import { invalidateSession } from "../mongodb";

export default {
    path: "/logout",
    method: "get",
    handler: (gl) => async (req, res) => {
        if (Object.prototype.hasOwnProperty.call(req.cookies, "session"))
            await invalidateSession(gl, req.cookies.session);
        res.sendStatus(200);
    }
} as Endpoint;
