import { pkgConfig, tsConfig } from "../../lib/utils";

describe("lib.cli.utils.ProcessUtil", async () => {
  it("should get valid package configuraiton", async () => {
    await expect(pkgConfig()).resolves.toHaveProperty("name", "ts-framework-cli");
  });

  it("should handle invalid package configuraiton", async () => {
    await expect(pkgConfig("blah")).rejects.toThrow(/no such file or directory/gi);
  });

  it("should get valid ts configuraiton", async () => {
    const ts = await tsConfig();
    expect(ts).toHaveProperty("compilerOptions");
    expect(ts.compilerOptions).toHaveProperty("outDir");
  });
});
