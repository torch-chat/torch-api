import { ValidationError, TypedSchema, UntypedSchema, TypedSchemaEntry } from "../interface";
import { ofType } from "./ofType";

// eslint-disable-next-line
export function validate(schema: TypedSchema | UntypedSchema, body: { [index: string]: any }) {
    const errors: ValidationError[] = [];
    for (const [prop, rule] of Object.entries(schema)) {
        if ((rule.required ?? false) && !Object.prototype.hasOwnProperty.call(body, prop)) {
            errors.push({ prop, err: "property is required" });
            continue;
        }
        if ((rule.notNull ?? false) && body[prop] === null) {
            errors.push({ prop, err: "property is not nullable" });
            continue;
        }
        // eslint-disable-next-line
        if (Object.prototype.hasOwnProperty.call(rule, "type") && !ofType(body[prop], (rule as TypedSchemaEntry<any>).type)) {
            errors.push({ prop, err: "property type mismatch" });
            continue;
        }
        const validators = rule.validate ?? [];
        for (const validator of validators instanceof Array ? validators : [validators]) {
            const err = validator(body[prop]);
            if (err !== undefined) errors.push(err);
        }
    }
    return errors;
}
