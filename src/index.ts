import * as express from "express";
import { MongoClient } from "mongodb";
import * as yaml from "js-yaml";
import * as fs  from "fs";
import { Config, Globals } from "./interface";
import { endpoints } from "./endpoints";
import { Session, User } from "./orm";

const app = express();
const cfg: Config = yaml.load(fs.readFileSync("/etc/torch/torch.yaml", "utf8")) as Config;
const mcl = new MongoClient(cfg.mongodb.connection_string);
const gl: Globals = {
    cfg,
    db: mcl.db(cfg.mongodb.database),
    log: (type, message) => console.log(`[${type}] ${message}`)
};

app.use(express.json());
app.use(async (req, res, next) => {
    if (req.cookies instanceof Object && Object.prototype.hasOwnProperty.call(req.cookies, "session")) {
        const user = await gl.db.collection<Session>("sessions").aggregate<User>(
            [
                { $match: { key: req.cookies.session } },
                { $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "user" } },
                { $replaceRoot: { newRoot: { $first: "$user" } } }
            ]
        ).next();
        req.env = {
            loggedIn: true,
            user
        };
        return next();
    }
    req.env = {
        loggedIn: false,
        user: null
    };
    return next();
});
for (const endpoint of endpoints as unknown as ((app: express.Express, gl: Globals) => void)[])
    endpoint(app, gl);

app.listen(cfg.port, () => {
    console.log(`Torch API listening on port ${cfg.port}!`);
});
