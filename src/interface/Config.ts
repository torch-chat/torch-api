export interface Config {
    port: number;
    mongodb: {
        connection_string: string;
        database: string;
    };
}
