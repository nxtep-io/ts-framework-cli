import * as fs from "fs";
import * as Path from 'path';
import Server, { ServerOptions } from "ts-framework";
import { BaseError, Logger, LoggerInstance } from "ts-framework-common";
import { Argv } from "yargs";
import { exec, tsConfig } from "./utils";

export interface BaseCommandOptions {
  logger?: LoggerInstance;
  entrypoint?: string;
  port?: string | number;
  env?: string;
}

export interface CommanderDefs {
  syntax: string;
  description: string;
  handler?:
    | ((yargs: Argv) => Argv)
    | {
        [label: string]: any;
      };
  builder?:
    | ((yargs: Argv) => Argv)
    | {
        [label: string]: any;
      };
}

export default abstract class BaseCommand {
  public readonly logger: LoggerInstance;
  public readonly abstract command: CommanderDefs;

  constructor(public options: BaseCommandOptions = {}) {
    this.run = this.run.bind(this);
    this.logger = options.logger || Logger.getInstance();
  }

  /**
   * Gets the distribution path registered in the tsconfig.json file.
   */
  public async getDistributionPath() {
    // Try to find transpiled directory using tsconfig
    const config = await tsConfig();
    return Path.resolve(process.cwd(), config.compilerOptions.outDir);
  }

  public async getEntrypoint({ env, entrypoint }): Promise<string> {
    const sourceFile = Path.resolve(process.cwd(), entrypoint);

    if (env === "development") {
      // Load directly from specified entrypoint in development mode
      return sourceFile;
    } 
    
    // In production, we need to handle TS files
    if (Path.extname(sourceFile) === ".ts") {
      // Try to find transpiled directory using tsconfig
      const distributionPath = await this.getDistributionPath();

      // Check if the transpiled sources directory already exists
      if (!fs.existsSync(distributionPath)) {
        this.logger.debug("Building typescript source into plain javascript files...", { distributionPath });
        await exec("yarn tsc");
      }

      // Try to find transpiled file from specified source
      const fileName = Path.basename(sourceFile, ".ts");
      const relativePath = Path.relative(process.cwd(), Path.dirname(sourceFile));
      let distributionFile = Path.join(distributionPath, relativePath, `${fileName}.js`);

      if (!fs.existsSync(distributionFile)) {
        // Try to find in distribution root, as a last attempt to make it work
        const fileName = Path.basename(sourceFile, ".ts");
        distributionFile = Path.join(distributionPath, `${fileName}.js`);

        if (fs.existsSync(distributionFile)) {
          // Runs from transpiled file
          this.logger.verbose(`Found transpiled server in "${distributionFile}"`);
        } else {
          this.logger.verbose(`Could not find transpiled file"`);
          0
        }
      } else {
        // Runs from transpiled file
        this.logger.verbose(`Found transpiled server in "${distributionFile}"`);
      }

      return distributionFile;
    }
    
    // Entrypoint doesn't need to be transpiled
    return sourceFile;
  }

  /**
   * Loads a new module from its relative path to cwd and initialize its instance.
   */
  protected async load(relativePath: string, options?: ServerOptions): Promise<Server> {
    const pathToServer = Path.resolve(process.cwd(), relativePath);
    try {
      const Module = await import(pathToServer);

      if (!Module || !Module.default) {
        throw new Error("Module has no default export");
      }

      return new Module.default(options);
    } catch (exception) {
      console.error(exception);
      throw new BaseError(`Could not load Server instance: "${exception.message}"`);
    }
  }

  /**
   * Handles Yargs instance registration.
   */
  public async onProgram(yargs: Argv): Promise<any> {
    // Bind command action
    const handler = async argv => {
      try {
        return await this.run.apply(this, [argv]);
      } catch (exception) {
        this.logger.error(exception);
        setTimeout(() => process.exit(1), 1000);
      }
    };

    // Register the command definition
    return yargs.command({
      handler,
      command: this.command.syntax,
      describe: this.command.description,
      builder: this.command.builder
    });
  }

  /**
   * Executes the command when asked by the Command Line with the argv object.
   */
  public abstract async run(argv: any): Promise<void>;
}
