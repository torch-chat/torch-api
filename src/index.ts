import * as express from "express";
import * as yaml from "js-yaml";
import * as fs  from "fs";
import { Config, Context } from "./interface";

const cfg: Config = yaml.load(fs.readFileSync("/etc/torch/torch.yaml", "utf8")) as Config;
const app = express();
const ctx: Context = { cfg };

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
