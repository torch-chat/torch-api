import { Class } from "./Class";

export type Validator<T> = (value: T) => boolean | boolean[];
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
