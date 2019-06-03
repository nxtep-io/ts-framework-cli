import * as fs from "fs";
import * as Path from "path";
import { Logger, LoggerInstance } from "ts-framework-common";
import * as yargs from "yargs";
import BaseCommand from "./BaseCommand";
import * as Basic from "./commands";
import * as Database from "./database";

export interface CommandLineOptions {
  logger?: LoggerInstance;
  commands?: (typeof BaseCommand)[];
}

export const DEFAULT_ENTRYPOINT = process.env.ENTRYPOINT || "./api/server.ts";
export const DEFAULT_ENV = process.env.NODE_ENV || "development";
export const DEFAULT_PORT = process.env.PORT || 3000;

export default class CommandLine {
  public logger: LoggerInstance;
  public commands: BaseCommand[];
  public yargs: yargs.Argv;

  public static readonly DEFAULT_OPTS = {
    entrypoint: DEFAULT_ENTRYPOINT,
    port: DEFAULT_PORT,
    env: DEFAULT_ENV
  };

  public static readonly DEFAULT_COMMANDS = [
    Basic.GenerateCommand,
    Basic.ListenCommand,
    Basic.ConsoleCommand,
    Basic.RunCommand,
    Basic.WatchCommand,
    Basic.InfoCommand,
    Basic.CleanCommand,
    Database.DatabaseConsoleCommand,
    Database.DatabaseSchemaCommand,
    Database.DatabaseDropCommand,
    Database.DatabaseMigrateCommand,
  ];

  constructor(public options: CommandLineOptions = {}) {
    // Prepare logger and initial yargs instance
    this.yargs = yargs.usage("Usage: $0 <command> [...args]").wrap(Math.min(120, yargs.terminalWidth()));

    // Prepare verbose option
    this.yargs
      .scriptName('ts-framework')
      .boolean("verbose")
      .alias("V", "verbose")
      .describe("verbose", "Runs command in verbose mode");

    // Prepare help guide
    this.yargs
      .help("h")
      .alias("h", "help")
      .alias("v", "version");

    // Prepare logger instance
    this.logger = options.logger || Logger.initialize();

    // Initialize commands using current options
    const cmdArr: (typeof BaseCommand)[] = options.commands || CommandLine.DEFAULT_COMMANDS;
    this.commands = cmdArr.map((Command: any) => {
      return new Command({ logger: this.logger, ...CommandLine.DEFAULT_OPTS });
    });

    // Starts command mounting
    this.onMount().catch(this.onError.bind(this));
  }

  public static initialize(options: CommandLineOptions = {}) {
    return new CommandLine(options).yargs.argv;
  }

  public onError(error) {
    this.logger.error(error);

    // Async exit for log processing to occur before crashing
    setTimeout(() => process.exit(1), 500);
  }

  public async onMount() {
    // Check TS Node is available
    try {
      require("ts-node/register/transpile-only");
    } catch (exception) {
      this.logger.warn(exception);
      this.logger.warn("\n\nWARN: TS Node is not available, typescript files won't be supported");
    }

    // Bind all commands to current program
    this.commands.map(cmd => cmd.onProgram(this.yargs));

    // Prepare additional info in help
    this.yargs.epilog(fs.readFileSync(Path.join(__dirname, "../raw/cli.help.txt")).toString("utf-8"));
  }
}
