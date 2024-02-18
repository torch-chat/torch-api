import { RequestHandler } from "express";
import { Class } from "./Class";

export interface ValidationError {
    prop: string;
    err: string;
}

export type Validator<T> = (value: T) => ValidationError | undefined;
export type SchemaEntry<T> = {
    type: string | Class<T>;
    required?: boolean;
    notNull?: boolean;
    validate?: Validator<T> | Validator<T>[];
}
export type Schema = {
    // eslint-disable-next-line
    [prop: string]: SchemaEntry<any>;
}

export interface Endpoint {
    schema?: Schema;
    handler: RequestHandler;
}
