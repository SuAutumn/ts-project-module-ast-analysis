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

interface FileESInterface {
  readonly filename: string;
  fileContent: string;
  importList: ImportDataInterface[];
  exportList: ExportDataInterface[];
  readFile(filename: string): Promise<string>;
  parse(): Promise<void>;
}

interface ASTInterface {
  astParse(code: string, options?: TSESTreeOptions): TSESTree.Program;
  ast: TSESTree.Program | null;
}

type ExportDeclaration =
  | TSESTree.ExportAllDeclaration
  | TSESTree.ExportDefaultDeclaration
  | TSESTree.ExportNamedDeclaration;

class FileES implements FileESInterface, ASTInterface {
  readonly filename: string;
  fileContent: string;
  ast: TSESTree.Program | null;
  exportList: ExportDataInterface[] = [];
  importList: ImportDataInterface[] = [];

  constructor(filename: string) {
    this.filename = filename;
    this.ast = null;
  }

  astParse(
    code: string,
    options?: TSESTreeOptions | undefined
  ): TSESTree.Program {
    return parse(code, options);
  }

  async parse() {
    this.fileContent = await this.readFile(this.filename);
    this.ast = this.astParse(this.fileContent, {
      comment: false,
      jsx: /\.[tj]sx$/.test(this.filename),
      range: true,
      loggerFn(msg) {
        console.log(`ast message ${msg}`);
      },
    });
    this.importList = this.getImportList();
    this.exportList = this.getExportList();
    console.log(this);
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
    if (this.ast) {
      return this.ast.body.filter(
        (statement) =>
          statement.type === AST_NODE_TYPES.ImportDeclaration &&
          statement.importKind === "value"
      ) as TSESTree.ImportDeclaration[];
    }
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
    if (this.ast) {
      return this.ast.body.filter(
        (statement) =>
          (statement.type === AST_NODE_TYPES.ExportAllDeclaration ||
            statement.type === AST_NODE_TYPES.ExportDefaultDeclaration ||
            statement.type === AST_NODE_TYPES.ExportNamedDeclaration) &&
          statement.exportKind === "value"
      ) as ExportDeclaration[];
    }
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

  async readFile(filename: string): Promise<string> {
    try {
      return await fsPromise.readFile(filename, "utf-8");
    } catch (err) {
      throw err;
    }
  }
}

export default FileES;
