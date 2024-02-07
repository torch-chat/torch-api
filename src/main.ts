import * as express from "express";
import * as yaml from "js-yaml";
import * as fs  from "fs";
import { Config } from "./interface";

const cfg: Config = yaml.load(fs.readFileSync("/etc/ignis/ignis.yaml", "utf8")) as Config;

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(cfg.port, () => {
    console.log(`Ignis API listening on port ${cfg.port}!`);
});
