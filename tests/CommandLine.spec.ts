import { CommandLine } from "../lib";

describe("lib.cli.CommandLine", async () => {
  it("should initialize and parse a command line propery", async () => {
    const cmd = new CommandLine({});
    expect(cmd.yargs).toBeTruthy();

    // Call the command line help programatically
    await new Promise(resolve =>
      cmd.yargs.parse(["--help"], (error, argv, output) => {
        expect(error).toBeFalsy();
        expect(argv).toBeTruthy();
        expect(output).toMatch(/Usage\: ts-framework <command> \[...args\]/gi);
        resolve();
      })
    );
  });

  it("should run a simple info command propery", async () => {
    const cmd = new CommandLine({});
    expect(cmd.yargs).toBeTruthy();

    // Call the command line help programatically
    await new Promise(resolve =>
      cmd.yargs.parse(["info", "./example/api/server.ts"], { development: true }, (error, argv, output) => {
        expect(error).toBeFalsy();
        expect(argv).toBeTruthy();
        resolve();
      })
    );
  });
});
