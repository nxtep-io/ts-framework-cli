import Server, { ServerOptions } from "ts-framework";
import { LoggerInstance } from "ts-framework-common";
import { Argv } from "yargs";
export interface BaseCommandOptions {
    logger?: LoggerInstance;
    entrypoint?: string;
    port?: string | number;
    env?: string;
}
export interface CommanderDefs {
    syntax: string;
    description: string;
    handler?: ((yargs: Argv) => Argv) | {
        [label: string]: any;
    };
    builder?: ((yargs: Argv) => Argv) | {
        [label: string]: any;
    };
}
export default abstract class BaseCommand {
    options: BaseCommandOptions;
    readonly logger: LoggerInstance;
    abstract readonly command: CommanderDefs;
    constructor(options?: BaseCommandOptions);
    /**
     * Gets the distribution path registered in the tsconfig.json file.
     */
    getDistributionPath(): Promise<string>;
    getEntrypoint({ env, entrypoint }: {
        env: any;
        entrypoint: any;
    }): Promise<string>;
    /**
     * Loads a new module from its relative path to cwd and initialize its instance.
     */
    protected load(relativePath: string, options?: ServerOptions): Promise<Server>;
    /**
     * Handles Yargs instance registration.
     */
    onProgram(yargs: Argv): Promise<any>;
    /**
     * Executes the command when asked by the Command Line with the argv object.
     */
    abstract run(argv: any): Promise<void>;
}
