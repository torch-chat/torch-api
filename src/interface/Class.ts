// eslint-disable-next-line
export interface Class<T> extends Function {
    // eslint-disable-next-line
    new (...args: any[]): T;
}
