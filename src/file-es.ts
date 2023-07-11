import {
  parse,
  TSESTreeOptions,
  TSESTree,
  AST_NODE_TYPES,
} from "@typescript-eslint/typescript-estree";
import * as fsPromise from "node:fs/promises";

export interface ImportDataInterface {
  nameList: {
    name: string;
    alias?: string;
  }[];
  source: string;
}

export interface ExportDataInterface {
  nameList?: {
    name: string;
    alias?: string;
  }[];
  source?: string;
}

export interface ExportFlatDataInterface {
  source?: string;
  name: string;
  alias?: string;
}

interface FileESInterface {
  readonly filename: string;
  readonly fileContent: string;
  importList: ImportDataInterface[];
  exportList: ExportDataInterface[];
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
  ast: TSESTree.Program;
  exportList: ExportDataInterface[] = [];
  importList: ImportDataInterface[] = [];

  constructor(options: { filename: string; fileContent: string }) {
    this.filename = options.filename;
    this.fileContent = options.fileContent;
    this.ast = this.parse();
    this.importList = this.getImportList();
    this.exportList = this.getExportList();
  }

  parse(content?: string, options?: TSESTreeOptions) {
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
    return this.ast.body.filter(
      (statement) =>
        statement.type === AST_NODE_TYPES.ImportDeclaration &&
        statement.importKind === "value"
    ) as TSESTree.ImportDeclaration[];
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
    return this.ast.body.filter(
      (statement) =>
        (statement.type === AST_NODE_TYPES.ExportAllDeclaration ||
          statement.type === AST_NODE_TYPES.ExportDefaultDeclaration ||
          statement.type === AST_NODE_TYPES.ExportNamedDeclaration) &&
        statement.exportKind === "value"
    ) as ExportDeclaration[];
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

  getFlatExportList() {
    return this.exportList.reduce((previousValue, currentValue) => {
      currentValue.nameList?.forEach((item) => {
        previousValue.push({
          source: currentValue.source,
          name: item.name,
          alias: item.alias,
        });
      });
      return previousValue;
    }, [] as ExportFlatDataInterface[]);
  }

  getExportByName(name: string) {
    return this.getFlatExportList().find(
      (item) => name === item.alias || name === item.name
    );
  }
}

export default FileES;
