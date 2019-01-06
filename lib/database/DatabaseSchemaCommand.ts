import { BaseError } from "ts-framework-common";
import { MysqlDriver } from 'typeorm/driver/mysql/MysqlDriver';
import * as yeoman from "yeoman-environment";
import RunCommand from "../BaseCommand";
import { getDatabases } from "../utils";

export default class DatabaseCheckCommand extends RunCommand {
  env: any;
  command = {
    // Override specific configiurations
    syntax: "db:schema",
    description: "Runs database schema checking routines",
    builder: yargs => {
      yargs
        .boolean("e")
        .alias("e", "entrypoint")
        .describe("e", "Sets server entrypoint for looking for databases");
      yargs
        .string("g")
        .alias("g", "generate")
        .describe("g", "Generate a new migration file with schema diff");
      return yargs;
    }
  };

  constructor(options = {}) {
    super(options);
    this.env = yeoman.createEnv();
  }

  public async run({ entrypoint = this.options.entrypoint, name, ...options }) {
    // Force development mode for TS support using TS Node
    const port = options.port || this.options.port;
    const distributionFile = await this.getEntrypoint({ entrypoint, env: 'development' });
    this.logger.debug(`Starting database in development environment from ${distributionFile}`);

    // Manually start the server lifecycle without listening to express port
    const instance = await this.load(distributionFile, { ...options, port });
    // await instance.onInit();

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

    if (!db) {
      throw new BaseError(
        'The database has an unknown interface, make sure it\'s a TS Framework module and that it\'s updated'
      );
    }

    await db.connect();
    this.logger.info('Checking database schema', { database: db.options.name });

    // TODO: Check is a typeorm database, or make it generic
    const connection = (db as any).connection;
    const sqlInMemory = await connection.driver.createSchemaBuilder().log();
    const upSqls: string[] = [];
    const downSqls: string[] = [];

    if (!upSqls.length && !downSqls.length) {
      throw new BaseError('No migration is needed, schema is synchronized');
    }

    // mysql is exceptional here because it uses ` character in to escape names in queries, that's why for mysql
    // we are using simple quoted string instead of template string syntax
    if (connection.driver instanceof MysqlDriver) {
      sqlInMemory.upQueries.forEach(query => {
        upSqls.push(`await queryRunner.query(\`${query.replace(new RegExp(`"`, "g"), `\\"`)}\`);`);
      });
      sqlInMemory.downQueries.forEach(query => {
        downSqls.push(`await queryRunner.query(\`${query.replace(new RegExp(`"`, "g"), `\\"`)}\`);`);
      });
    } else {
      sqlInMemory.upQueries.forEach(query => {
        upSqls.push(`await queryRunner.query(\`${query.replace(new RegExp("`", "g"), "\\`")}\`);`);
      });
      sqlInMemory.downQueries.forEach(query => {
        downSqls.push(`await queryRunner.query(\`${query.replace(new RegExp("`", "g"), "\\`")}\`);`);
      });
    }

    // Prepare Yeoman generator
    // Ensure entity name was provided for components
    if (options.generate && !options.generate.length) {
      throw new BaseError(`Cannot not generate a schema migration without a valid name`);
    } else if (options.generate) {
      this.env.register(require.resolve('generator-ts-framework/generators/migration'), `ts-framework`);
      const opts: any = { up: upSqls.join('\n    '), down: downSqls.join('\n    ') };
      await new Promise<void>((resolve, reject) =>
        this.env.run(`ts-framework ${options.generate}`, opts, error => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        })
      );
    }

    this.logger.info('Success', { upSqls, downSqls });
    await instance.close();
    return;
  }
}
