import * as express from "express";
import * as yaml from "js-yaml";
import * as fs  from "fs";
import { Config, Context } from "./interface";
import { MongoClient } from "mongodb";

const app = express();
const cfg: Config = yaml.load(fs.readFileSync("/etc/torch/torch.yaml", "utf8")) as Config;
const mcl = new MongoClient(cfg.mongodb_connection_string);
const ctx: Context = {
    cfg,
    db: mcl.db("torch"),
    log: (type, message) => console.log(`[${type}] ${message}`)
};

app.use(express.json());
app.use((req, res, next) => {
    res.locals = { ctx };
    return next();
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(cfg.port, () => {
    console.log(`Torch API listening on port ${cfg.port}!`);
});
