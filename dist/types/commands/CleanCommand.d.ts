import BaseCommand from "../BaseCommand";
export default class CleanCommand extends BaseCommand {
    command: {
        syntax: string;
        description: string;
        handler: (yargs: any) => any;
    };
    run({ entrypoint, ...options }: {
        [x: string]: any;
        entrypoint?: string;
    }): Promise<void>;
}
