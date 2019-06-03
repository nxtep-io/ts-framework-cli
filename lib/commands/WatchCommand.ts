import * as Nodemon from "nodemon";
import * as Path from "path";
import * as Package from "pjson";
import BaseCommand from "../BaseCommand";

export default class WatchCommand extends BaseCommand {
  command = {
    syntax: "watch [entrypoint]",
    description: "Starts the development server with live reload using the listen command",
    builder: yargs => {
      yargs
        .string("p")
        .alias("p", "port")
        .describe("p", "The PORT to listen to, can be overriden with PORT env variable");

      yargs
        .string("i")
        .alias("i", "inspect")
        .describe("i", "Starts development server with inspection flags for debug");

      yargs
        .string("r")
        .alias("r", "run")
        .describe("r", "Starts the development server using the run command")

      return yargs;
    }
  };

  public async run({ entrypoint = this.options.entrypoint, ...options }) {
    this.logger.debug(`[ts-framework] ${Package.name}@${Package.version}`);
    this.logger.debug(`[ts-framework] starting server from \`${entrypoint}\´`);
    this.logger.debug(`[ts-framework] watching files from  \`./**/*\´`);
    if (options.inspect) {
      this.logger.debug(`[ts-framework] inspect mode:  \`${options.inspect.toString()}\``);
    }
    this.logger.debug(`[ts-framework] to restart at any time, enter \`rs\`\n`);

    // Prepare command execution
    const port = process.env.PORT || options.port;
    const command = `node -r ts-node/register ${options.inspect ? `--inspect=${options.inspect}` : ""}`;

    // tslint:disable-next-line:max-line-length
    let exec = `${command} ${Path.join(__dirname, "../bin")} ${options.run ? "run" : "listen"} --development ${entrypoint}`;
    exec += port ? ` --port ${port} ` : "";

    Nodemon({
      exec,
      debug: !!options.inspect,
      delay: "1000",
      ext: "ts,js",
      cwd: process.cwd(),
      watch: ["./**/*"],
      ignore: ["./dist", "./build", "./docs", "./coverage"]
    });

    Nodemon.on("restart", files => {
      this.logger.debug("[ts-framework] restarting due to changes...", { files });
    });

    Nodemon.on("quit", () => {
      this.logger.debug("[ts-framework] terminating...");
      process.exit(1);
    });

    Nodemon.on("crash", error => {
      this.logger.warn("[ts-framework] instance crashed unexpectedly", error);
      this.logger.debug("[ts-framework] waiting for files changes before restarting...");
    });
  }
}
