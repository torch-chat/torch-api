import { ValidationException } from "../exceptions";
import { TypedSchema, UntypedSchema, TypedSchemaEntry } from "../interface";
import { ofType } from "./ofType";

// eslint-disable-next-line
export function validate(schema: TypedSchema | UntypedSchema, body: { [index: string]: any }) {
    for (const [prop, rule] of Object.entries(schema)) {
        if ((rule.required ?? false) && !Object.prototype.hasOwnProperty.call(body, prop))
            throw new ValidationException(`property undefined: ${prop}`);
        if ((rule.notNull ?? false) && body[prop] === null)
            throw new ValidationException(`property null: ${prop}`);
        // eslint-disable-next-line
        if (Object.prototype.hasOwnProperty.call(rule, "type") && !ofType(body[prop], (rule as TypedSchemaEntry<any>).type))
            // eslint-disable-next-line
            throw new ValidationException(`type mismatch: ${prop} should be ${(rule as TypedSchemaEntry<any>).type}`);
        const validators = rule.validate ?? [];
        for (const validator of validators instanceof Array ? validators : [validators])
            validator(body[prop]);
    }
}
