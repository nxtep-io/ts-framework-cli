import * as Path from "path";
import { BaseError } from "ts-framework-common";
import Server, { ReplConsole, ServerOptions } from "ts-framework";
import BaseCommand from "../BaseCommand";

export default class ConsoleCommand extends BaseCommand {
  command = {
    syntax: "console [entrypoint]",
    description: "Starts the interactive console",
    builder: yargs => {
      return yargs
        .string("p")
        .alias("p", "port")
        .describe("p", "The PORT to listen to, can be overriden with PORT env variable");
    }
  };

  /**
   * Loads a new Server module and initialize its instance from relative path.
   */
  public async load(relativePath: string, options?: ServerOptions): Promise<Server> {
    const pathToServer = Path.resolve(process.cwd(), relativePath);
    try {
      const Module = await import(pathToServer);

      if (!Module || !Module.default) {
        throw new Error("Module has no default export");
      }

      return new Module.default(options);
    } catch (exception) {
      throw new BaseError(`Could not load Server instance: "${exception.message}"`, exception);
    }
  }

  /**
   * Runs the REPL console in the supplied Server instance.
   */
  public async run({ entrypoint = this.options.entrypoint, port }) {
    const options = { port: process.env.PORT || port || 3000 };
    const instance = await this.load(entrypoint, {
      ...options,
      repl: new ReplConsole({
        name: require("../../package.json").name
      })
    });
    await instance.listen();
  }
}
