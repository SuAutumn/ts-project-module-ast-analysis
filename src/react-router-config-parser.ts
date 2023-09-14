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
import isString from "./utils/is-string";

interface ReactRouterConfigParserInterface {
  parse(): void;
  on(
    eventName: "route",
    listener: (props: { manager: FileESManager; route: Config }) => void
  ): this;
  emit(
    eventName: "route",
    props: { manager: FileESManager; route: Config }
  ): boolean;
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

  /** 找到和name匹配的VariableDeclarator */
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

  /** 获取路由数组对象 */
  handleArrayRouteConfig(): Config[] | undefined {
    const defaultExport = this.file.getDefaultExport()?.name;
    if (defaultExport) {
      let routesExpression: TSESTree.Node | null | undefined;
      if (defaultExport === "default") {
        /** export default [...xxx] */
        routesExpression = this.astFilter.filter(this.file.ast!.body, [
          AST_NODE_TYPES.ExportDefaultDeclaration,
        ])[0]?.declaration;
      } else {
        routesExpression = this.getDeclarationAst(defaultExport)?.init;
      }
      if (is(routesExpression, AST_NODE_TYPES.ArrayExpression)) {
        return this.as.handleArrayExpression(routesExpression) as Config[];
      }
    }
  }

  /** 处理Spread元素的RouteConfig */
  handleSpreadRouteConfig(config: Config[]): Config[] {
    let newConfig: Config[] = [];
    config.forEach((conf) => {
      if (conf.value && isString(conf.value.value)) {
        const filename = this.getImportFilename(conf.value.value);
        let resolveFilename: string | undefined;
        if (filename) {
          resolveFilename = this.pathHelper.resolveImportFilename(
            this.file.filename,
            filename
          );
        }
        if (resolveFilename) {
          const parser = new ReactRouterConfigParser(
            resolveFilename,
            this.pathHelper
          );
          const subconfig = parser.handleArrayRouteConfig();
          if (subconfig) {
            newConfig.push(...subconfig);
          }
        }
      } else {
        if (conf.routes) {
          conf.routes = this.handleSpreadRouteConfig(conf.routes);
        }
        newConfig.push(conf);
      }
    });
    return newConfig;
  }

  getRouteConfig() {
    const config = this.handleArrayRouteConfig();
    if (config) {
      return this.handleSpreadRouteConfig(config);
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

  private getImportFilename(name: string) {
    const importAst = this.file.getImportByName(name);
    const ast = this.getDeclarationAst(name)?.init;
    if (importAst) {
      return importAst.source;
    } else if (ast) {
      const rawCode = this.file.fileContent.slice(...ast.range);
      /** 获取react lazy import文件地址 */
      return rawCode.match(/import\(["'](.+)["']\)/)?.[1];
    }
    console.log(`Not found ${name} variable declarator.`);
  }

  handleFile(config: Config[]) {
    config.forEach((conf) => {
      const component = conf.component || conf.render;
      let filename: string | undefined;
      if (component) {
        switch (component.type) {
          case "Identifier":
          case "ArrowFunctionExpression":
          case "FunctionExpression":
            if (isString(component.value)) {
              filename = this.getImportFilename(component.value);
            }
            break;
          case AST_NODE_TYPES.CallExpression:
            const [arg] = component.arguments;
            if (arg.type === AST_NODE_TYPES.Identifier && isString(arg.value)) {
              filename = this.getImportFilename(arg.value);
            }
            break;
        }
      }
      if (filename) {
        this.emit("route", {
          manager: this.createFileESManager(filename),
          route: conf,
        });
      }
      if (conf.routes) {
        this.handleFile(conf.routes);
      }
    });
  }

  parse() {
    const config = this.getRouteConfig();
    if (config) {
      this.handleFile(config);
    }
  }
}

export default ReactRouterConfigParser;
