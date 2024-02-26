import { BaseException } from "./BaseException";

export class ValidationException extends BaseException {
    type: "validation";
}
