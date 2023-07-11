import FileES from "../src/file-es";
import { parse } from "@typescript-eslint/typescript-estree";
import readFile from "../src/utils/read-file";

describe("file es module tester", () => {
  const filename = "test-project/index.tsx";

  const importDefaultDeclaration = `import a from "./App";`;
  const importDeclaration = `import { a } from "./App";`;
  const importTypeDeclaration = `import type a from "./App";`;
  const exportTypeDeclaration = `export type App = string;`;
  const exportDeclarationWithSource = `export {default as App, useAppContext} from  "./App";`;
  const exportAllDeclaration = `export * from "./App";`;
  const exportAllAliasDeclaration = `export * as App from "./App";`;
  const exportDefaultDeclaration = `export default App;`;
  const exportDeclaration = ` export { App, Bpp };`;

  it(`Read ${filename} file.`, async () => {
    const file = await readFile(filename);
    expect(typeof file).toBe("string");
  });

  it(`Abort read ${filename} file function.`, () => {
    const p = readFile(filename);
    p.abort();
    return p
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        expect(e.code).toBe("ABORT_ERR");
      });
  });

  it("Read not exist file .", async () => {
    try {
      const fileContent = await readFile("a.js");
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

  it(`Parse ${importDeclaration}`, () => {
    const fileEs = new FileES({ fileContent: importDeclaration, filename: "" });
    const [list] = fileEs.importList;
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
    expect(list).toMatchObject({ nameList: [{ name: "App" }] });
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
    expect(list).toMatchObject({ source: "./App" });
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
    const flatList = fileEs.getFlatExportList();
    console.log(flatList);
    expect(flatList.length).toBe(2);
  });
});
