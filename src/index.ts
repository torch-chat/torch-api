import * as express from "express";
import * as yaml from "js-yaml";
import * as fs  from "fs";
import { Config, Globals } from "./interface";
import { MongoClient } from "mongodb";

const app = express();
const cfg: Config = yaml.load(fs.readFileSync("/etc/torch/torch.yaml", "utf8")) as Config;
const mcl = new MongoClient(cfg.mongodb_connection_string);
const gl: Globals = {
    cfg,
    db: mcl.db("torch"),
    log: (type, message) => console.log(`[${type}] ${message}`)
};

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(cfg.port, () => {
    console.log(`Torch API listening on port ${cfg.port}!`);
});
