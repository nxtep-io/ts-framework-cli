import RunCommand from "./RunCommand";
import BaseCommand from "../BaseCommand";

export default class ListenCommand extends BaseCommand {
  command = {
    // Override specific configiurations
    syntax: "listen [entrypoint]",
    description: "Starts the standalone server",
    builder: yargs => {
      yargs
        .boolean("d")
        .alias("d", "development")
        .describe("d", "Starts server without production flags");

      yargs
        .string("p")
        .alias("p", "port")
        .describe("p", "The PORT to listen to, can be overriden with PORT env variable");

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
    await instance.listen();
  }
}
