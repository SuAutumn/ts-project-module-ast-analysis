import FileESManager from "../src/file-es-manager";
import * as path from "path";

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

  it("Test walkTree method", async () => {
    const absFilename = path.resolve(filename);
    const m = new FileESManager(absFilename);
    await m.getTerminalImportList();
    console.log(m.terminalImportList.map((f) => f.filename));
  });

  it("Test", async () => {
    const absFilename = path.resolve(
      "../../work/we-seeds-pro/src/pages/asset-homepage/index.tsx"
    );
    const m = new FileESManager(absFilename);
    await m.getTerminalImportList();
    console.log(m.terminalImportList.map((f) => f.filename));
  });
});
