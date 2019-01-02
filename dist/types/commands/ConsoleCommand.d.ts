import Server, { ServerOptions } from "ts-framework";
import BaseCommand from "../BaseCommand";
export default class ConsoleCommand extends BaseCommand {
    command: {
        syntax: string;
        description: string;
        builder: (yargs: any) => any;
    };
    /**
     * Loads a new Server module and initialize its instance from relative path.
     */
    load(relativePath: string, options?: ServerOptions): Promise<Server>;
    /**
     * Runs the REPL console in the supplied Server instance.
     */
    run({ entrypoint, port }: {
        entrypoint?: string;
        port: any;
    }): Promise<void>;
}
