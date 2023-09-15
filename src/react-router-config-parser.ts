import { EventEmitter } from "node:events";
import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/typescript-estree";
import FileESManager from "./file-es-manager";
import handleAst from "./utils/handle-ast-statement";
import FileESPathHelper from "./file-es-path-helper";
import FileES from "./file-es";
import { readFileSync } from "./utils/read-file";
import filterAst from "./utils/filter-ast-statement";
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
  readonly pathHelper: FileESPathHelper;
  constructor(filename: string, pathHelper: FileESPathHelper) {
    super();
    this.file = new FileES({ filename, fileContent: readFileSync(filename) });
    this.pathHelper = pathHelper;
  }

  /** 找到和name匹配的VariableDeclarator */
  private getNamedDeclaration(name: string) {
    const file = this.file;
    return filterAst
      .filter(file.ast?.body, [AST_NODE_TYPES.VariableDeclaration])
      .reduce((prev, curr) => {
        const declarators = filterAst.filter(curr.declarations, [
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

  /** 获取路由数组对象 */
  handleArrayRouteConfig(): Config[] | undefined {
    const defaultExport = this.file.getDefaultExport()?.name;
    if (defaultExport) {
      let routesExpression: TSESTree.Node | null | undefined;
      if (defaultExport === "default") {
        /** export default [...xxx] */
        routesExpression = filterAst.filter(this.file.ast!.body, [
          AST_NODE_TYPES.ExportDefaultDeclaration,
        ])[0]?.declaration;
      } else {
        routesExpression = this.getNamedDeclaration(defaultExport)?.init;
      }
      if (is(routesExpression, AST_NODE_TYPES.ArrayExpression)) {
        return handleAst.handleArrayExpression(routesExpression) as Config[];
      }
    }
  }

  /** 处理Spread元素的RouteConfig */
  handleSpreadRoute(config: Config): void {
    if (
      config.type === AST_NODE_TYPES.SpreadElement &&
      config.value &&
      isString(config.value.value)
    ) {
      const filename = this.getImportFilename(config.value.value);
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
        parser.on("route", (props) => this.emit("route", props));
        parser.parse();
      }
    }
  }

  getRouteConfig() {
    return this.handleArrayRouteConfig();
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
    const ast = this.getNamedDeclaration(name)?.init;
    if (importAst) {
      return importAst.source;
    } else if (ast) {
      const rawCode = this.file.fileContent.slice(...ast.range);
      /** 获取react lazy import文件地址 */
      return rawCode.match(/import\(["'](.+)["']\)/)?.[1];
    }
    console.log(`Not found ${name} variable declarator.`);
  }

  /** 解析配置，生成FileESManager */
  parseConfig(conf: Config) {
    const component = conf.component || conf.render;
    if (component) {
      let filename: string | undefined;
      switch (component.type) {
        case AST_NODE_TYPES.Identifier:
        case AST_NODE_TYPES.FunctionExpression:
        case AST_NODE_TYPES.ArrowFunctionExpression:
          if (isString(component.value)) {
            filename = this.getImportFilename(component.value);
          }
          break;
        case AST_NODE_TYPES.CallExpression:
          const arg = component.arguments[0];
          if (arg.type === AST_NODE_TYPES.Identifier && isString(arg.value)) {
            filename = this.getImportFilename(arg.value);
          }
          break;
      }
      if (filename) {
        return this.createFileESManager(filename);
      }
    }
  }

  handleFile(config: Config[]) {
    config.forEach((conf) => {
      const manager = this.parseConfig(conf);
      if (manager) {
        this.emit("route", {
          manager,
          route: conf,
        });
      } else if (conf.type === AST_NODE_TYPES.SpreadElement) {
        this.handleSpreadRoute(conf);
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
