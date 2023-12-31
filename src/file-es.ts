import {
  AST_NODE_TYPES,
  parse,
  TSESTree,
  TSESTreeOptions,
} from "@typescript-eslint/typescript-estree";
import filterAstStatement from "./utils/filter-ast-statement";
import handleAstStatement from "./utils/handle-ast-statement";
import { is } from "./utils/asset-ast-statement";
import * as path from "path";
import { FileESConstructorParams } from "./dto";

export interface ImportDataInterface {
  nameList: {
    name: string;
    alias?: string;
    type: AST_NODE_TYPES;
  }[];
  source: string;
}

export interface ExportDataInterface extends Partial<ImportDataInterface> {}

export interface VariableDataInterface {
  name: string;
}

export interface ExportFlatDataInterface {
  source?: string;
  name?: string;
  alias?: string;
  type?: string;
}

interface FileESInterface {
  readonly filename: string;
  readonly fileContent?: string;
  readonly importList: ImportDataInterface[];
  readonly exportList: ExportDataInterface[];
  readonly variableList: VariableDataInterface[];
  parse(content?: string): void;
  ast: TSESTree.Program | null;
}

type ExportDeclaration =
  | TSESTree.ExportAllDeclaration
  | TSESTree.ExportDefaultDeclaration
  | TSESTree.ExportNamedDeclaration;

/**
 * 文件描述
 */
class FileES implements FileESInterface {
  readonly filename: string;
  readonly fileContent: string;
  ast: TSESTree.Program | null;
  exportList: ExportDataInterface[] = [];
  importList: ImportDataInterface[] = [];
  variableList: VariableDataInterface[] = [];
  hs = handleAstStatement;
  filter = filterAstStatement;
  static SUPPORTED_FILE = /\.[jt]sx?$/;

  constructor({ filename, fileContent = "" }: FileESConstructorParams) {
    this.filename = filename;
    this.fileContent = fileContent;
    this.ast = this.parse();
    this.importList = this.getImportList();
    this.exportList = this.getExportList();
    this.variableList = this.getVariableList();
  }

  static isSupportedFile(filename: string) {
    return FileES.SUPPORTED_FILE.test(path.extname(filename));
  }

  getVariableList() {
    const variableList = [] as VariableDataInterface[];

    const declarations = this.filter.filterVariableDeclaration(this.ast?.body);

    declarations.forEach((d) => {
      switch (d.type) {
        case AST_NODE_TYPES.VariableDeclaration:
          const nameList = this.hs
            .handleVariableDeclaratorList(d.declarations)
            .flat(Infinity);
          nameList.forEach((name) => variableList.push({ name }));
          break;
        case AST_NODE_TYPES.ClassDeclaration:
          variableList.push({
            name: this.hs.handleClassDeclaration(d) || "",
          });
          break;
        case AST_NODE_TYPES.FunctionDeclaration:
          variableList.push({
            name: this.hs.handleFunctionDeclaration(d) || "",
          });
          break;
      }
    });
    return variableList;
  }

  parse(content?: string, options?: TSESTreeOptions) {
    const c = content || this.fileContent;
    if (!c) return null;
    try {
      return parse(c, {
        comment: false,
        jsx: /\.[tj]sx$/.test(this.filename),
        range: true,
        loggerFn(msg) {
          if (process.env.NODE_ENV === "development") {
            console.log(`ast message ${msg}`);
          }
        },
        ...options,
      });
    } catch (e) {
      return null;
    }
  }

  getImportList() {
    const importDeclarations = this.getImportDeclaration();
    return importDeclarations.map((declaration) => {
      const nameList = declaration.specifiers.map((s) => this.getSpecifier(s));
      return { nameList, source: declaration.source.value };
    });
  }

  getImportDeclaration() {
    return this.filter.filterImportDeclaration(this.ast?.body);
  }

  getExportList() {
    const exportDeclarations = this.getExportDeclaration();
    return exportDeclarations.map((declaration) => {
      return this.getExportSpecifier(declaration);
    });
  }

  getExportDeclaration() {
    return this.filter.filterExportDeclaration(this.ast?.body);
  }

  getSpecifier(
    specifier: TSESTree.ImportClause
  ): ImportDataInterface["nameList"][number] {
    const { type } = specifier;
    switch (type) {
      case AST_NODE_TYPES.ImportDefaultSpecifier:
        /** import a from "a"  */
        return {
          name: specifier.local.name,
          type,
        };
      case AST_NODE_TYPES.ImportSpecifier:
        /** import {a as b} from "a" */
        return {
          name: specifier.local.name,
          alias: specifier.imported.name,
          type,
        };
      case AST_NODE_TYPES.ImportNamespaceSpecifier:
        /** import * as a from "a" */
        return { name: "*", alias: specifier.local.name, type };
    }
  }

  getExportSpecifier(declaration: ExportDeclaration): ExportDataInterface {
    const { type } = declaration;
    switch (type) {
      case AST_NODE_TYPES.ExportAllDeclaration:
        /** export * from "a" */
        return {
          source: declaration.source.value,
          nameList: [{ name: "*", alias: declaration.exported?.name, type }],
        };
      case AST_NODE_TYPES.ExportDefaultDeclaration:
        /** export default const a = "a" */
        const { declaration: node } = declaration;
        return {
          nameList: [
            {
              name: is(node, AST_NODE_TYPES.Identifier) ? node.name : "default",
              type,
            },
          ],
        };
      case AST_NODE_TYPES.ExportNamedDeclaration:
        /** export { default as a } from "a" */
        let exportItem: ExportDataInterface = {
          source: declaration.source?.value,
        };
        if (declaration.declaration) {
          const name = this.hs.handleNameExportDeclarations(
            declaration.declaration
          );
          if (typeof name === "string") {
            exportItem.nameList = [{ name, type }];
          }
          if (name instanceof Array) {
            exportItem.nameList = name.flat(Infinity).map((n: string) => {
              return { name: n, type };
            });
          }
        }
        if (declaration.specifiers.length > 0) {
          exportItem.nameList = declaration.specifiers.map((s) => {
            return { name: s.local.name, alias: s.exported.name, type };
          });
        }
        return exportItem;
    }
  }

  getFlatImportOrExportList(list: ExportDataInterface[]) {
    return list.reduce((pre, cur) => {
      if (cur.nameList && cur.nameList.length > 0) {
        cur.nameList.forEach((item) => {
          pre.push({
            source: cur.source,
            name: item.name,
            alias: item.alias,
            type: item.type,
          });
        });
      } else if (cur.source) {
        pre.push({ source: cur.source });
      }
      return pre;
    }, [] as ExportFlatDataInterface[]);
  }

  getExportByName(name: string) {
    return this.getFlatImportOrExportList(this.exportList).find(
      (item) =>
        item.type !== AST_NODE_TYPES.ExportDefaultDeclaration &&
        (name === item.alias || name === item.name)
    );
  }

  getDefaultExport() {
    return this.getFlatImportOrExportList(this.exportList).find(
      (item) => item.type === AST_NODE_TYPES.ExportDefaultDeclaration
    );
  }

  getImportByName(name: string) {
    return this.getFlatImportOrExportList(this.importList).find(
      (item) => name === item.alias || name === item.name
    );
  }

  getVariableByName(name: string) {
    return this.variableList.find((v) => v.name === name);
  }

  getImplicitExportList() {
    return this.getFlatImportOrExportList(this.exportList).filter((item) => {
      return item.source && item.name === "*" && !item.alias;
    });
  }
}

export default FileES;
