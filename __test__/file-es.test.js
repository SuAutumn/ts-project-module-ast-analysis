import FileES from "../src/file-es";

describe("file es module tester", () => {
  it("read file.", async () => {
    const fileEs = new FileES("");
    const file = await fileEs.readFile("test-project/index.tsx");
    expect(typeof file).toBe("string");
  });

  it("read file not exist.", async () => {
    const fileEs = new FileES("");
    try {
      await fileEs.readFile("test-project/index.ts");
    } catch (e) {
      expect(() => {
        throw e;
      }).toThrowError();
    }
  });

  it("parse.", async () => {
    const fileEs = new FileES("test-project/index.tsx");
    await fileEs.parse();
    expect(fileEs.ast?.type).toBe("Program");
  });

  it('parse import a from "./App"', () => {
    const fileEs = new FileES("");
    fileEs.ast = fileEs.astParse(`
    import a from "./App";
    `);
    const [list] = fileEs.getImportList();
    expect(list).toMatchObject({ source: "./App", nameList: [{ name: "a" }] });
  });

  it('parse import { a } from "./App"', () => {
    const fileEs = new FileES("");
    fileEs.ast = fileEs.astParse(`
    import { a } from "./App";
    `);
    const [list] = fileEs.getImportList();
    expect(list).toMatchObject({
      source: "./App",
      nameList: [{ name: "a", alias: "a" }],
    });
  });

  it('parse import type a from "./App"', () => {
    const fileEs = new FileES("");
    fileEs.ast = fileEs.astParse(`
    import type a from "./App";
    `);
    const declaration = fileEs.getImportDeclaration();
    expect(declaration.length).toBe(0);
  });

  it("parse export type App", () => {
    const fileEs = new FileES("");
    fileEs.ast = fileEs.astParse(`
    export type App = string;
    `);

    const exportDeclarations = fileEs.getExportDeclaration();
    expect(exportDeclarations?.length).toBe(0);
  });

  it("parse export default App", () => {
    const fileEs = new FileES("");
    fileEs.ast = fileEs.astParse(`
    export default App;
    `);

    const exportDeclarations = fileEs.getExportDeclaration();
    expect(exportDeclarations?.length).toBe(1);
    const [list] = fileEs.getExportList();
    expect(list).toMatchObject({ nameList: [{ name: "App" }] });
  });

  it('parse export {default as App, useAppContext} from  "./App"', () => {
    const fileEs = new FileES("");
    fileEs.ast = fileEs.astParse(`
    export {default as App, useAppContext} from  "./App";
    `);
    const [list] = fileEs.getExportList();
    expect(list).toMatchObject({
      source: "./App",
      nameList: [
        { name: "default", alias: "App" },
        { name: "useAppContext", alias: "useAppContext" },
      ],
    });
  });

  it('parse export * from  "./App"', () => {
    const fileEs = new FileES("");
    fileEs.ast = fileEs.astParse(`
    export * from "./App";
    `);
    const [list] = fileEs.getExportList();
    expect(list).toMatchObject({ source: "./App" });
  });

  it('parse export * as App from  "./App"', () => {
    const fileEs = new FileES("");
    fileEs.ast = fileEs.astParse(`
    export * as App from "./App";
    `);
    const [list] = fileEs.getExportList();
    expect(list).toMatchObject({
      source: "./App",
      nameList: [{ name: "*", alias: "App" }],
    });
  });

  it("parse export { App, Bpp }", () => {
    const fileEs = new FileES("");
    fileEs.ast = fileEs.astParse(`
    export { App, Bpp };
    `);

    const [list] = fileEs.getExportList();
    expect(list).toMatchObject({
      nameList: [
        { name: "App", alias: "App" },
        { name: "Bpp", alias: "Bpp" },
      ],
    });
  });
});
