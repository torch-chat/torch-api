import { ValidationError, Schema } from "../interface";
import { ofType } from "./ofType";

// eslint-disable-next-line
export function validate(schema: Schema, body: { [index: string]: any }) {
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
        if (!ofType(body[prop], rule.type)) {
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
