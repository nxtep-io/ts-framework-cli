import { BaseError } from "ts-framework-common";
import * as yeoman from "yeoman-environment";
import BaseCommand from "../BaseCommand";

export interface GenerateCommandOptions {
  name?: string;
  path?: string;
  component: string;
  skipInstall?: boolean;
}

export default class GenerateCommand extends BaseCommand {
  env: any;
  command = {
    syntax: "new <component> [name]",
    description: "Generates a new TS Framework application or component.",
    builder: yargs => {
      yargs
        .boolean("s")
        .alias("s", "skip-install")
        .describe("s", "Skips yarn installation and post generation routines");

      yargs
        .string("p")
        .alias("p", "path")
        .describe("p", "The base path to create the file, relative to current working dir");

      yargs
        .string("b")
        .alias("b", "base-url")
        .describe("b", "The base URL for the Controller generation, not applied to other components");

      yargs
        .string("t")
        .alias("t", "table-name")
        .describe("t", "The table name for the Model generation, not applied to other components");
    }
  };

  public static APP_COMPONENT = "app";
  public static AVAILABLE_COMPOENENTS = [
    GenerateCommand.APP_COMPONENT, 
    "controller", 
    "service", 
    "job", 
    "model", 
    "migration"
  ];

  constructor(options = {}) {
    super(options);
    this.env = yeoman.createEnv();
  }

  public async run({ component, name, path = "", skipInstall, baseUrl, tableName }: any) {
    if (GenerateCommand.AVAILABLE_COMPOENENTS.indexOf(component) < 0) {
      throw new BaseError(`Could not generate unknown component: "${component}"`);
    }

    // Ensure entity name was provided for components
    if ((!name || !name.length) && component !== "app") {
      throw new BaseError(`Cannot not generate a ${component} without a valid name`);
    }

    const generatorName =
      component !== "app" ? `generator-ts-framework/generators/${component}` : "generator-ts-framework";

    this.env.register(require.resolve(generatorName), `ts-framework`);
    const opts: any = { skipInstall, baseUrl, tableName };

    if (path) {
      opts.path = path;
    }

    return new Promise<void>((resolve, reject) =>
      this.env.run(`ts-framework ${name ? name : ""}`, opts, error => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      })
    );
  }
}
