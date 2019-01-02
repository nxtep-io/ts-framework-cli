import BaseCommand from "../BaseCommand";
export interface GenerateCommandOptions {
    name?: string;
    path?: string;
    component: string;
    skipInstall?: boolean;
}
export default class GenerateCommand extends BaseCommand {
    env: any;
    command: {
        syntax: string;
        description: string;
        builder: (yargs: any) => void;
    };
    static APP_COMPONENT: string;
    static AVAILABLE_COMPOENENTS: string[];
    constructor(options?: {});
    run({ component, name, path, skipInstall, baseUrl, tableName }: any): Promise<void>;
}
