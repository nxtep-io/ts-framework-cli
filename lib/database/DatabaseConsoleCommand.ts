import { BaseError } from "ts-framework-common";
import RunCommand from "../BaseCommand";
import { getDatabases } from "../utils";

export default class DatabaseCommand extends RunCommand {
  command = {
    // Override specific configiurations
    syntax: "db:query <query>",
    description: "Runs database query using Server entrypoint",
    builder: yargs => {
      yargs
        .boolean("e")
        .alias("e", "entrypoint")
        .describe("e", "Sets server entrypoint for looking for databases");
      return yargs;
    }
  };

  public async run({ entrypoint = this.options.entrypoint, ...options }) {
    // Force development mode for TS support using TS Node
    const port = options.port || this.options.port;
    const distributionFile = await this.getEntrypoint({ entrypoint, env: 'development' });
    this.logger.debug(`Starting database in development environment from ${distributionFile}`);

    // Manually start the server lifecycle without listening to express port
    const instance = await this.load(distributionFile, { ...options, port });
    await instance.onInit();
    await instance.onReady();

    // Find database instance    
    const dbs = await getDatabases(instance);

    if (!dbs || !dbs.length) {
      throw new BaseError(
        // tslint:disable-next-line:max-line-length
        'Could not find any database registered in the supplied server instance, make sure it\'s registered as a child component',
      );
    }

    // TODO: Support multiple databases
    const db = dbs[0];

    if (!db || !db.query) {
      throw new BaseError(
        'The database has an unknown interface, make sure it\'s a TS Framework module and that it\'s updated'
      );
    }

    this.logger.info('Running database query', { database: db.options.name, query: options.query });
    this.logger.info('Database query result', { result: await db.query(options.query) });
    return;
  }
}
