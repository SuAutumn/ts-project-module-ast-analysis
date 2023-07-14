import {
  AST_NODE_TYPES,
  parse,
  TSESTree,
  TSESTreeOptions,
} from "@typescript-eslint/typescript-estree";
import filterAstStatement from "./utils/filter-ast-statement";
import handleAstStatement from "./utils/handle-ast-statement";

export interface ImportDataInterface {
  nameList: {
    name: string;
    alias?: string;
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
}

interface FileESInterface {
  readonly filename: string;
  readonly fileContent: string;
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

class FileES implements FileESInterface {
  readonly filename: string;
  readonly fileContent: string;
  ast: TSESTree.Program | null;
  exportList: ExportDataInterface[] = [];
  importList: ImportDataInterface[] = [];
  variableList: VariableDataInterface[] = [];
  hs = handleAstStatement;
  filter = filterAstStatement;

  constructor(options: { filename: string; fileContent: string }) {
    this.filename = options.filename;
    this.fileContent = options.fileContent;
    this.ast = this.parse();
    this.importList = this.getImportList();
    this.exportList = this.getExportList();
    this.variableList = this.getVariableList();
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
    try {
      return parse(content || this.fileContent, {
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
    return (
      importDeclarations?.map((declaration) => {
        const nameList = declaration.specifiers.map((s) =>
          this.getSpecifier(s)
        );
        return { nameList, source: declaration.source.value };
      }) || []
    );
  }

  getImportDeclaration() {
    return this.filter.filterImportDeclaration(this.ast?.body);
  }

  getExportList() {
    const exportDeclarations = this.getExportDeclaration();
    return (
      exportDeclarations?.map((declaration) => {
        return this.getExportSpecifier(declaration);
      }) || []
    );
  }

  getExportDeclaration() {
    return this.filter.filterExportDeclaration(this.ast?.body);
  }

  getSpecifier(specifier: TSESTree.ImportClause) {
    switch (specifier.type) {
      case AST_NODE_TYPES.ImportDefaultSpecifier:
        /** import a from "a"  */
        return {
          name: specifier.local.name,
        };
      case AST_NODE_TYPES.ImportSpecifier:
        /** import {a as b} from "a" */
        return {
          name: specifier.local.name,
          alias: specifier.imported.name,
        };
      case AST_NODE_TYPES.ImportNamespaceSpecifier:
        /** import * as a from "a" */
        return { name: "*", alias: specifier.local.name };
    }
  }

  getExportSpecifier(declaration: ExportDeclaration): ExportDataInterface {
    switch (declaration.type) {
      case AST_NODE_TYPES.ExportAllDeclaration:
        /** export * from "a" */
        return {
          source: declaration.source.value,
          nameList: [{ name: "*", alias: declaration.exported?.name }],
        };
      case AST_NODE_TYPES.ExportDefaultDeclaration:
        /** export default const a = "a" */
        const { declaration: d } = declaration as {
          declaration: TSESTree.Identifier;
        };
        if (d.type !== AST_NODE_TYPES.Identifier) {
          throw new Error(
            `${this.filename} export declaration type is not ${AST_NODE_TYPES.Identifier}`
          );
        }
        return { nameList: [{ name: d.name }] };
      case AST_NODE_TYPES.ExportNamedDeclaration:
        /** export { default as a } from "a" */
        return {
          source: declaration.source?.value,
          nameList: declaration.specifiers.map((s) => {
            return { name: s.local.name, alias: s.exported.name };
          }),
        };
    }
  }

  getFlatImportOrExportList(
    list: { source?: string; nameList?: { name?: string; alias?: string }[] }[]
  ) {
    return list.reduce((pre, cur) => {
      if (cur.nameList && cur.nameList.length > 0) {
        cur.nameList.forEach((item) => {
          pre.push({
            source: cur.source,
            name: item.name,
            alias: item.alias,
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
      (item) => name === item.alias || name === item.name
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
