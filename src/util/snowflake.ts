import { pid } from "process";

let incr = 4095;

export function snowflake(workerId = 0) {
    return BigInt(Date.now()) << 22n + BigInt(workerId) << 17n + BigInt(pid) << 12n + BigInt(incr = (incr + 1) % 4096);
}
