import * as express from "express";
import { MongoClient } from "mongodb";
import * as yaml from "js-yaml";
import * as fs  from "fs";
import { Config, Globals } from "./interface";
import { endpoints } from "./endpoints";
import { validate } from "./util";

const app = express();
const cfg: Config = yaml.load(fs.readFileSync("/etc/torch/torch.yaml", "utf8")) as Config;
const mcl = new MongoClient(cfg.mongodb.connection_string);
const gl: Globals = {
    cfg,
    db: mcl.db(cfg.mongodb.database),
    log: (type, message) => console.log(`[${type}] ${message}`)
};

app.use(express.json());
for (const endpoint of endpoints) {
    app[endpoint.method](endpoint.path, (req, res, next) => {
        if (endpoint.params) validate(endpoint.params, req.params);
        if (endpoint.query) validate(endpoint.query, req.query);
        if (endpoint.body) validate(endpoint.body, req.body);
        next();
    }, endpoint.handler(gl));
}

app.listen(cfg.port, () => {
    console.log(`Torch API listening on port ${cfg.port}!`);
});
