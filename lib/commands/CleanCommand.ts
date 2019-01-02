import * as fs from "fs";
import * as Path from "path";
import * as rimraf from "rimraf";
import BaseCommand from "../BaseCommand";
import { tsConfig } from "../utils";

export default class CleanCommand extends BaseCommand {
  command = { 
    // Override specific configiurations
    syntax: "clean",
    description: "Cleans the distribution files",
    handler: yargs => yargs
  };

  public async run({ entrypoint = this.options.entrypoint, ...options }) {
    // Try to find transpiled directory using tsconfig
    const config = await tsConfig();
    const distributionPath = Path.resolve(process.cwd(), config.compilerOptions.outDir);

    // Check if the transpiled sources directory already exists
    if (fs.existsSync(distributionPath)) {
      this.logger.debug("Cleaning distribution files...", { distributionPath });
      rimraf.sync(distributionPath);
      this.logger.info("Success!");
    } else {
      this.logger.info("No distribution files were found");
    }
  }
}
