import { Class } from "../interface";

// eslint-disable-next-line
export function ofType(arg: any, type: string | Class<any>) {
    if (type instanceof Function) {
        // Type is a reference type.
        return arg instanceof type;
    } else {
        // Type is primitive.
        return typeof arg === type;
    }
}
