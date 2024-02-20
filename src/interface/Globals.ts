import { Db } from "mongodb";
import { Config } from "./Config";

type ErrType = "mongo_acknowledge";

export interface Globals {
    cfg: Config;
    db: Db;
    log: (type: ErrType, message: string) => void;
}
