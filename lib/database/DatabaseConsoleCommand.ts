import { Database } from "ts-framework-common";
import RunCommand from "../BaseCommand";

export default class DatabaseCommand extends RunCommand {
  command = {
    // Override specific configiurations
    syntax: "db:query <query>",
    description: "Runs database query using Server entrypoint",
    builder: yargs => {
      // yargs
      //   .boolean("e") 
      //   .alias("e", "entrypoint")
      //   .describe("d", "Starts server without production flags");
      return yargs;
    }
  };

  public async run({ entrypoint = this.options.entrypoint, ...options }) {
    // Force production unless flag was supplied
    const port = options.port || this.options.port;
    const env = options.development ? "development" : "production";

    const distributionFile = await this.getEntrypoint({ entrypoint, env });
    this.logger.debug(`Starting database in "${env}" environment from ${distributionFile}`);

    if (env !== "development") {
      // Force production environment
      process.env.NODE_ENV = "production";
    }

    // Manually start the server lifecycle without listening to express port
    const instance = await this.load(distributionFile, { ...options, port });
    await instance.onInit();
    await instance.onReady();

    // Find database instance
    const db = instance.components().find((component) => {
      // Check if component extends Database abstract class
      const parent = Object.getPrototypeOf(component.constructor);
      const base = Object.getPrototypeOf(parent);
      return base.name === 'Database';
    });

    if (!db) {
      this.logger.error('No database registered in the server instance');
      setTimeout(() => process.exit(-1), 1000);
      return;
    }

    if (db && db['connection']) {
      this.logger.info('Running database query', { query: options.query });
      console.log(await db['connection'].query(options.query));
    }
    return;
  }
}
