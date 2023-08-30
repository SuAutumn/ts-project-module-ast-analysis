import { EventEmitter } from "node:events";
import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/typescript-estree";
import FileESManager from "./file-es-manager";
import handleAstStatement from "./utils/handle-ast-statement";
import FileESPathHelper from "./file-es-path-helper";
import FileES from "./file-es";
import { readFileSync } from "./utils/read-file";
import filterAstStatement from "./utils/filter-ast-statement";
import { is } from "./utils/asset-ast-statement";
import { Config } from "./dto";

interface ReactRouterConfigParserInterface extends EventEmitter {
  parse(): void;
  on(
    eventName: "route",
    listener: (args: { manager: FileESManager; route: Config }) => void
  ): this;
}

class ReactRouterConfigParser
  extends EventEmitter
  implements ReactRouterConfigParserInterface
{
  readonly file: FileES;
  readonly as: typeof handleAstStatement;
  readonly pathHelper: FileESPathHelper;
  readonly astFilter = filterAstStatement;
  constructor(filename: string, pathHelper: FileESPathHelper) {
    super();
    this.file = new FileES({ filename, fileContent: readFileSync(filename) });
    this.pathHelper = pathHelper;
    this.as = handleAstStatement;
  }

  private getDeclarationAst(name: string) {
    const file = this.file;
    if (file && file.ast) {
      return this.astFilter
        .filter(file.ast.body, [AST_NODE_TYPES.VariableDeclaration])
        .reduce((prev, curr) => {
          const declarators = this.astFilter.filter(curr.declarations, [
            AST_NODE_TYPES.VariableDeclarator,
          ]);
          return [...prev, ...declarators];
        }, [] as TSESTree.VariableDeclarator[])
        .find((node) => {
          if (is(node.id, AST_NODE_TYPES.Identifier)) {
            return node.id.name === name;
          }
        });
    }
  }

  getRoutesValue(): Config[] | undefined {
    const defaultExport = this.file.getDefaultExport()?.name;
    if (defaultExport) {
      const routesExpression = this.getDeclarationAst(defaultExport)?.init;
      if (is(routesExpression, AST_NODE_TYPES.ArrayExpression)) {
        return this.as.handleArrayExpression(routesExpression);
      }
    }
  }

  private createFileESManager(filename: string) {
    const innerFilename = this.pathHelper.resolveImportFilename(
      this.file.filename,
      filename
    );
    if (innerFilename) {
      return new FileESManager(innerFilename, this.pathHelper);
    }
  }

  private handleReactLazyImportComponent(name: string, route: Config) {
    let filename: string | undefined;
    const importAst = this.file.getImportByName(name);
    const ast = this.getDeclarationAst(name)?.init;
    if (importAst) {
      filename = importAst.source;
    } else if (ast) {
      const rawCode = this.file.fileContent.slice(...ast.range);
      /** 获取react lazy import文件地址 */
      filename = rawCode.match(/import\(["'](.+)["']\)/)?.[1];
    } else {
      // console.log(`Not found ${name} variable declarator.`);
    }
    if (filename) {
      const manager = this.createFileESManager(filename);
      this.emit("route", { manager, route });
    }
  }

  private handleFile(config: Config[]) {
    config.forEach((conf) => {
      if (typeof conf.component !== "string") {
        switch (conf.component.type) {
          case "Identifier":
            this.handleReactLazyImportComponent(conf.component.name, conf);
            break;
          case "ArrowFunctionExpression":
          case "FunctionExpression":
            this.handleReactLazyImportComponent(conf.component.body, conf);
            break;
        }
      }
      if (conf.routes) {
        this.handleFile(conf.routes);
      }
    });
  }

  parse() {
    const config = this.getRoutesValue();
    if (config) {
      this.handleFile(config);
    }
  }
}

export default ReactRouterConfigParser;
