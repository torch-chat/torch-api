import { RequestHandler } from "express";
import { Class } from "./Class";
import { Globals } from "./Globals";

export type Validator<T> = (value: T) => void;
export type TypedSchemaEntry<T> = {
    type: string | Class<T>;
    required?: boolean;
    notNull?: boolean;
    validate?: Validator<T> | Validator<T>[];
}
export type UntypedSchemaEntry = Pick<TypedSchemaEntry<string>, "required" | "notNull" | "validate">;
export type TypedSchema = {
    // eslint-disable-next-line
    [prop: string]: TypedSchemaEntry<any>;
}
export type UntypedSchema = {
    [prop: string]: UntypedSchemaEntry;
}

export type Method = "all" | "get" | "post" | "put" | "delete" | "patch" | "options" | "head";
export interface Endpoint {
    path: string;
    method: Method;
    query?: TypedSchema;
    body?: TypedSchema;
    params?: UntypedSchema;
    handler: (gl: Globals) => RequestHandler;
}
