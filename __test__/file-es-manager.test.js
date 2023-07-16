import FileESManager from "../src/file-es-manager";
import * as path from "path";
import * as fs from "fs";

describe("File es manager module tester", () => {
  const filename = "test-project/index.tsx";
  it("Parse.", async () => {});

  it("Test getFilenameByAnother method.", async () => {
    const absFilename = path.resolve(filename);
    const m = new FileESManager(absFilename);
    const name1 = m.getFilenameFromAnother("a/b/c,js", "a.js");
    expect(name1).toBe(undefined);
    const name2 = m.getFilenameFromAnother(absFilename, "./card");
    expect(name2).toBe(path.resolve("test-project/card.tsx"));
    const name3 = m.getFilenameFromAnother(absFilename, "./components");
    expect(name3).toBe(path.resolve("test-project/components/index.ts"));
    const name4 = m.getFilenameFromAnother(absFilename, "./card.jsx");
    expect(name4).toBe(undefined);
  });

  it("Test aliasPathHelper method.", async () => {
    const absFilename = path.resolve(filename);
    const manager = new FileESManager(absFilename);
    const aliasManager = new FileESManager(absFilename, {
      alias: { "@": "./src" },
    });
    expect(aliasManager.aliasPathHelper("@/a/b.js")).toBe("./src/a/b.js");
    expect(aliasManager.aliasPathHelper("@fake/a/b.js")).toBe("@fake/a/b.js");
    expect(aliasManager.aliasPathHelper("a/b.js")).toBe("a/b.js");
    expect(aliasManager.aliasPathHelper("./a/b.js")).toBe("./a/b.js");
    expect(manager.aliasPathHelper("@/a/b.js")).toBe("@/a/b.js");
    expect(manager.aliasPathHelper("./a/b.js")).toBe("./a/b.js");
  });

  it("Test walkTree method", async () => {
    const absFilename = path.resolve(filename);
    const m = new FileESManager(absFilename, {
      alias: { "@": "./" },
    });
    await m.getTerminalImportList();
    console.log(
      m.terminalImportList.map((f) => f.filename.replace(process.cwd(), ""))
    );
  });

  it("Test", async () => {
    const absFilename = path.resolve(
      "../../work/we-seeds-pro/src/pages/asset-homepage/components/card/index.tsx"
    );
    const m = new FileESManager(absFilename, {
      alias: {
        "@": path.resolve("../../work/we-seeds-pro/src"),
      },
    });
    await m.getTerminalImportList();
    const result = m.terminalImportList.map((f) => f.filename);
    console.log(result);
    fs.writeFile(
      "./analysis.json",
      JSON.stringify(result, undefined, "  "),
      {
        encoding: "utf-8",
      },
      (err) => {
        console.log(err);
      }
    );
  });
});
