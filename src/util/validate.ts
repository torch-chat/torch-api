// eslint-disable-next-line
interface Class<T> extends Function {
    // eslint-disable-next-line
    new (...args: any[]): T;
}

interface ValidationError {
    prop: string;
    err: string;
}

type Validator<T> = (value: T) => ValidationError | undefined;
type SchemaEntry<T> = {
    type: string | Class<T>;
    required?: boolean;
    nullable?: boolean;
    validate?: Validator<T> | Validator<T>[];
}
export type Schema = {
    // eslint-disable-next-line
    [prop: string]: SchemaEntry<any>;
}

// eslint-disable-next-line
export function validate(schema: Schema, body: { [index: string]: any }) {
    const errors: ValidationError[] = [];
    for (const [prop, rule] of Object.entries(schema)) {
        if ((rule.required ?? true) && Object.prototype.hasOwnProperty.call(body, prop)) {
            errors.push({ prop, err: "property is required required" });
            continue;
        }
        if ((rule.nullable ?? true) && body[prop] === null) {
            errors.push({ prop, err: "property is not nullable" });
            continue;
        }
        let typeMismatch = false;
        if (rule.type instanceof Function) {
            if (!(body[prop] instanceof rule.type)) typeMismatch = true;
        } else {
            if (typeof body[prop] !== rule.type) typeMismatch = true;
        }
        if (typeMismatch) {
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
