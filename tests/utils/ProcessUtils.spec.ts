import { exec } from "../../lib/utils";

describe("lib.cli.utils.ProcessUtil", async () => {
  it("should exec a simple echo command", async () => {
    // Test successful command
    await expect(exec('echo "$((1 + 2))"')).resolves.toBe("3\n");

    // Test error command
    await expect(exec("blah")).rejects.toThrow(/blah\: command not found/gi);
  });
});
