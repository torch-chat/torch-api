import { randomBytes } from "crypto";

export function sessionKey() {
    return randomBytes(32).toString("base64");
}
