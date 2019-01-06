import RunCommand from "../BaseCommand";
export default class DatabaseCheckCommand extends RunCommand {
    env: any;
    command: {
        syntax: string;
        description: string;
        builder: (yargs: any) => any;
    };
    constructor(options?: {});
    run({ entrypoint, name, ...options }: {
        [x: string]: any;
        entrypoint?: string;
        name: any;
    }): Promise<void>;
}
