import RunCommand from "./RunCommand";
import BaseCommand from "../BaseCommand";
import { pkgConfig, getDatabases } from "../utils";

export default class InfoCommand extends BaseCommand {
  command = {
    // Override specific configiurations
    syntax: "info [entrypoint]",
    description: "Gets information from current server",
    builder: yargs => {
      yargs
        .boolean("d")
        .alias("d", "development")
        .describe("d", "Starts server without production flags");

      return yargs;
    }
  };

  public async run({ entrypoint = this.options.entrypoint, ...options }) {
    // Force production unless flag was supplied
    const port = options.port || this.options.port;
    const env = options.development ? "development" : "production";

    const distributionFile = await this.getEntrypoint({ entrypoint, env });
    this.logger.debug(`Starting server in "${env}" environment from ${distributionFile}`);

    if (env !== "development") {
      // Set production environment if missing
      process.env.NODE_ENV = process.env.NODE_ENV || "production";
    }

    const instance = await this.load(distributionFile, { ...options, port });

    // Prepare ts-framework info
    const pkg = await pkgConfig();
    const tsFramework = pkg.dependencies['ts-framework'];

    // Complete log for verbose purposes
    this.logger.info(
      // tslint:disable-next-line:prefer-template
      "\n--------------------------------------------------------------------------------\n" +
      "                                                                                  \n" +
      "        ts-framework                                                              \n" +
      "        ============                                                              \n" +
      "                                                                                  \n" +
      `        Framework version:   ${tsFramework}                                       \n` +
      "                                                                                  \n" +
      `        App name:            ${pkg.name}                                          \n` +
      `        App version:         ${pkg.version}                                       \n` +
      `        App port:            ${instance.options.port}                             \n` +
      "                                                                                  \n" +
      "\n--------------------------------------------------------------------------------\n" 
    );
  }
}
