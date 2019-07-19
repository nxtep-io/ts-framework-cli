import BaseCommand from "../BaseCommand";

export default class BaseRunCommand extends BaseCommand {
  command = {
    syntax: "run [entrypoint]",
    description: "Runs the server components without lifting express",
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
    const env = options.development ? "development" : options.env || "production";

    // Prepare distribution file
    const distributionFile = await this.getEntrypoint({ entrypoint, env });
    this.logger.debug(`Starting workers in "${env}" environment from ${distributionFile}`);

    if (env !== "development") {
      // Set production environment if missing
      process.env.NODE_ENV = process.env.NODE_ENV || "production";
    }

    // Load server constructor from distribution file path
    const instance = await this.load(distributionFile, { ...options, port });

    // Manually start the server lifecycle without listening to express port
    await instance.onInit();
    await instance.onReady();
  }
}
