import FileESManager from "../src/file-es-manager";
import * as path from "path";
import * as fs from "fs";

describe("File es manager module tester", () => {
  const filename = "test-project/index.tsx";
  it("Parse.", async () => {});

  it("Test getFilenameByAnother method.", async () => {
    const absFilename = path.resolve(filename);
    const m = new FileESManager(absFilename);
    const name1 = m.resolveImportFilename("a/b/c,js", "a.js");
    expect(name1).toBe(undefined);
    const name2 = m.resolveImportFilename(absFilename, "./card");
    expect(name2).toBe(path.resolve("test-project/card.tsx"));
    const name3 = m.resolveImportFilename(absFilename, "./components");
    expect(name3).toBe(path.resolve("test-project/components/index.ts"));
    const name4 = m.resolveImportFilename(absFilename, "./card.jsx");
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
      m.flatImportList.map((f) => f.filename.replace(process.cwd(), ""))
    );
  });

  // it("Test", async () => {
  //   const absFilename = path.resolve(
  //     "../../work/we-power/src/router/index.tsx"
  //   );
  //   const m = new FileESManager(absFilename, {
  //     alias: {
  //       "@": path.resolve("../../work/we-power/src"),
  //     },
  //   });
  //   await m.getTerminalImportList();
  //   const reg = /(?<!\w)t\(("[\w- ]+")\)/g;
  //   let tmp = "";
  //   m.flatImportList.forEach((f) => {
  //     tmp += `${f.filename}\n`;
  //     let regResult = "";
  //     while ((regResult = reg.exec(f.fileContent)) !== null) {
  //       tmp += `${regResult[1]}\n`;
  //     }
  //   });
  //   fs.writeFileSync("./analysis.json", tmp, {
  //     encoding: "utf-8",
  //   });
  // });
});
