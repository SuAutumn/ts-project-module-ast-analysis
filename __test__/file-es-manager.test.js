import FileESManager from "../src/file-es-manager";

describe("file es manager module tester", () => {
  it("parse.", async () => {
    const manager = new FileESManager("test-project/index.tsx");
    await manager.parse();
    expect(manager.fileES?.ast?.type).toBe("Program");
    await manager.getTerminalImportList()
    console.log(manager.terminalImportList)

  });
});
