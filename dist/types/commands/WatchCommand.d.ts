import BaseCommand from "../BaseCommand";
export default class WatchCommand extends BaseCommand {
    command: {
        syntax: string;
        description: string;
        builder: (yargs: any) => any;
    };
    run({ entrypoint, ...options }: {
        [x: string]: any;
        entrypoint?: string;
    }): Promise<void>;
}
