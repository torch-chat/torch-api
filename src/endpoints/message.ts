import { Express } from "express"
import { Globals, TypedSchemaEntry } from "../interface"
import { and, validate } from "../util";

export default (app: Express, gl: Globals) => {
    app.put("/message", validate({
        body: {
            content: {
                type: "string",
                required: true,
                notNull: true,
                validate: (c) => and([
                    c.length > 0,
                    c.length < 2048
                ])
            } as TypedSchemaEntry<string>
        }
    }), async (req, res) => {
        // TODO
    });
};
