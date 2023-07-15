import FileES from "../src/file-es";
import readFile from "../src/utils/read-file";
import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree";

describe("file es module tester", () => {
  const filename = "test-project/index.tsx";

  const importDefaultDeclaration = `import a from "./App";`;
  const importNamespaceDeclaration = `import * as a from "./App"`;
  const importEffectDeclaration = `import "./App"`;
  const importDeclaration = `import { a } from "./App";`;
  const importTypeDeclaration = `import type a from "./App";`;
  const exportTypeDeclaration = `export type App = string;`;
  const exportDeclarationWithSource = `export {default as App, useAppContext} from  "./App";`;
  const exportAllDeclaration = `export * from "./App";`;
  const exportAllAliasDeclaration = `export * as App from "./App";`;
  const exportDefaultDeclaration = `export default App;`;
  const exportDefaultDeclarationCallExpression = `export default App();`;
  const exportDeclaration = ` export { App, Bpp };`;
  const variableDeclaration = `
    const a = 1;
    const [arrayPatter, c = 1, { d }, ...rest] = b;
    const {objectPatter, b} = a;
    function functionA() {};
    class classA {};
  `;

  it(`Read ${filename} file.`, async () => {
    const file = await readFile(filename);
    expect(typeof file).toBe("string");
  });

  it(`Abort read ${filename} file function.`, () => {
    const p = readFile(filename);
    p.abort();
    return p
      .then((res) => {
        expect(res).toThrowError();
      })
      .catch((e) => {
        expect(e.code).toBe("ABORT_ERR");
      });
  });

  it("Read not exist file .", async () => {
    try {
      await readFile("a.js");
    } catch (e) {
      expect(() => {
        throw e;
      }).toThrowError();
    }
  });

  it(`Parse ${filename} ast.`, async () => {
    const fileContent = await readFile(filename);
    const fileEs = new FileES({ filename, fileContent });
    expect(fileEs.ast?.type).toBe("Program");
  });

  it(`Parse ${importDefaultDeclaration}`, () => {
    const fileEs = new FileES({
      filename: "",
      fileContent: importDefaultDeclaration,
    });
    const [list] = fileEs.importList;
    expect(list).toMatchObject({ source: "./App", nameList: [{ name: "a" }] });
  });

  it(`Parse ${importNamespaceDeclaration}`, () => {
    const f = new FileES({ filename, fileContent: importNamespaceDeclaration });
    const { importList } = f;
    expect(importList).toMatchObject([
      { source: "./App", nameList: [{ name: "*", alias: "a" }] },
    ]);
  });

  it(`Parse ${importEffectDeclaration}`, () => {
    const f = new FileES({ filename, fileContent: importEffectDeclaration });
    const { importList } = f;
    expect(importList).toMatchObject([{ source: "./App", nameList: [] }]);
  });

  it(`Parse ${importDeclaration}`, () => {
    const f = new FileES({ fileContent: importDeclaration, filename: "" });
    const [list] = f.importList;
    expect(list).toMatchObject({
      source: "./App",
      nameList: [{ name: "a", alias: "a" }],
    });
  });

  it(`Parse ${importTypeDeclaration}`, () => {
    const fileEs = new FileES({
      fileContent: importTypeDeclaration,
      filename: "",
    });
    const declaration = fileEs.getImportDeclaration();
    expect(declaration.length).toBe(0);
  });

  it(`Parse ${exportTypeDeclaration}`, () => {
    const fileEs = new FileES({
      filename: "",
      fileContent: exportTypeDeclaration,
    });
    const exportDeclarations = fileEs.getExportDeclaration();
    expect(exportDeclarations?.length).toBe(0);
  });

  it(`Parse ${exportDefaultDeclaration}`, () => {
    const fileEs = new FileES({
      filename: "",
      fileContent: exportDefaultDeclaration,
    });
    const [list] = fileEs.exportList;
    expect(list).toMatchObject({
      nameList: [
        { name: "default", type: AST_NODE_TYPES.ExportDefaultDeclaration },
      ],
    });
  });

  it("Parser default", () => {
    const fileEs = new FileES({
      filename: "",
      fileContent: `
        import app from "./App";
        export default App;
        export default wrapper(App);
        export { default as app } from "./App";
      `,
    });
    console.log(
      JSON.stringify(fileEs.importList, undefined, "  "),
      JSON.stringify(fileEs.exportList, undefined, "  ")
    );
  });

  it(`Parse ${exportDeclarationWithSource}`, () => {
    const fileEs = new FileES({
      filename: "",
      fileContent: exportDeclarationWithSource,
    });
    const [list] = fileEs.exportList;
    expect(list).toMatchObject({
      source: "./App",
      nameList: [
        { name: "default", alias: "App" },
        { name: "useAppContext", alias: "useAppContext" },
      ],
    });
  });

  it(`Parse ${exportAllDeclaration}`, () => {
    const fileEs = new FileES({
      filename: "",
      fileContent: exportAllDeclaration,
    });
    const [list] = fileEs.exportList;
    expect(list).toMatchObject({ source: "./App", nameList: [{ name: "*" }] });
  });

  it(`Parse ${exportAllAliasDeclaration}`, () => {
    const fileEs = new FileES({
      filename: "",
      fileContent: exportAllAliasDeclaration,
    });
    const [list] = fileEs.exportList;
    expect(list).toMatchObject({
      source: "./App",
      nameList: [{ name: "*", alias: "App" }],
    });
  });

  it(`Parse ${exportDeclaration}`, () => {
    const fileEs = new FileES({ filename: "", fileContent: exportDeclaration });
    const [list] = fileEs.exportList;
    expect(list).toMatchObject({
      nameList: [
        { name: "App", alias: "App" },
        { name: "Bpp", alias: "Bpp" },
      ],
    });
  });

  it("Test getFlatExportList method.", async () => {
    const fileEs = new FileES({ filename: "", fileContent: exportDeclaration });
    const flatList = fileEs.getFlatImportOrExportList(fileEs.exportList);
    expect(flatList.length).toBe(2);
  });

  it("Test getExportByName method.", () => {
    const file = new FileES({ filename: "", fileContent: exportDeclaration });
    const item = file.getExportByName("App");
    expect(item).toMatchObject({ name: "App", alias: "App" });
  });

  it(`Parse variableDeclaration`, () => {
    const f = new FileES({ filename: "", fileContent: variableDeclaration });
    console.log(f.variableList);
  });
});
