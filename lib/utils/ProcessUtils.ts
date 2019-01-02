import { exec as Exec } from "child_process";

/**
 * Simple method for executing child processes.
 */
export const exec = async function exec(cmd) {
  return new Promise<void>((resolve, reject) => {
    Exec(cmd, (error, stdout, stderr) => {
      if (error || stderr) {
        this.logger.error(stdout);
        this.logger.error(stderr);
        reject(error);
      } else {
        resolve();
      }
    });
  });
};
