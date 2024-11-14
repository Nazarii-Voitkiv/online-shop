export declare class Logger {
    private project;
    private message;
    constructor(project: string);
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
}
