import path from "path";
import { PathHelper } from "../lib";

describe("Test PathHelper class.", () => {
  const filename = "test-project/index.tsx";
  const absFilename = path.resolve(filename);
  const pathHelper = new PathHelper({
    alias: { "@": "./" },
  });
  it("Test resolveImportFilename method.", async () => {
    const name1 = pathHelper.resolveImportFilename("a/b/c,js", "a.js");
    expect(name1).toBe(undefined);
    const name2 = pathHelper.resolveImportFilename(absFilename, "./card");
    expect(name2).toBe(path.resolve("test-project/card.tsx"));
    const name3 = pathHelper.resolveImportFilename(absFilename, "./components");
    expect(name3).toBe(path.resolve("test-project/components/index.ts"));
    const name4 = pathHelper.resolveImportFilename(absFilename, "./card.jsx");
    expect(name4).toBe(undefined);
  });

  it("Test aliasPathHelper method.", async () => {
    const absFilename = path.resolve(filename);
    const nonAliasPathHelper = new PathHelper();
    const aliasPathHelper = new PathHelper({
      alias: { "@": "./src" },
    });
    expect(aliasPathHelper.replaceAliasPath("@/a/b.js")).toBe("./src/a/b.js");
    expect(aliasPathHelper.replaceAliasPath("@fake/a/b.js")).toBe(
      "@fake/a/b.js"
    );
    expect(aliasPathHelper.replaceAliasPath("a/b.js")).toBe("a/b.js");
    expect(aliasPathHelper.replaceAliasPath("./a/b.js")).toBe("./a/b.js");
    expect(nonAliasPathHelper.replaceAliasPath("@/a/b.js")).toBe("@/a/b.js");
    expect(nonAliasPathHelper.replaceAliasPath("./a/b.js")).toBe("./a/b.js");
  });
});
