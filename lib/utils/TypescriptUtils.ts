import * as fs from "fs";
import * as Path from "path";
import * as JSON5 from "json5";
import { BaseError } from "ts-framework-common";

/**
 * Gets config from current directory package.json file
 */
export const pkgConfig = async function pkgConfig(baseDir = process.cwd()) {
  // Try to find pkg file in current directory
  const pkgConfigPath = Path.resolve(baseDir, "package.json");
  const pkgConfigRaw = fs.readFileSync(pkgConfigPath);

  if (!pkgConfigRaw || !pkgConfigRaw.toString()) {
    throw new BaseError(`Could not load Package information file from: "${pkgConfigPath}"`);
  }

  // TODO: Handle exceptions here
  return JSON5.parse(pkgConfigRaw.toString());
};


/**
 * Gets ts config from current directory safely
 */
export const tsConfig = async function tsConfig() {
  // Try to find tsconfig file in current directory
  const tsConfigPath = Path.resolve(process.cwd(), "tsconfig.json");
  const tsConfigRaw = fs.readFileSync(tsConfigPath);

  if (!tsConfigRaw || !tsConfigRaw.toString()) {
    throw new BaseError(`Could not load TS Config file from: "${tsConfigPath}"`);
  }

  // TODO: Handle exceptions here
  return JSON5.parse(tsConfigRaw.toString());
};
