import RunCommand from "../BaseCommand";
export default class DatabaseCommand extends RunCommand {
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
