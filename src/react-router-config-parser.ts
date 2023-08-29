import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree";
import FileESManager from "./file-es-manager";
import handleAstStatement from "./utils/handle-ast-statement";
import FileESPathHelper from "./file-es-path-helper";
import path from "path";
import FileES from "./file-es";
import { readFileSync } from "./utils/read-file";

interface BaseConfig<T> {
  path: { value: string; type: "Literal" };
  componentId: { value: string; type: "Literal" };
  component: T;
  routes?: Config[];
}

type Config =
  | BaseConfig<string>
  | BaseConfig<{ name: string; type: "Identifier" }>
  | BaseConfig<{
      body: string;
      type: "ArrowFunctionExpression" | "FunctionExpression";
    }>;

class ReactRouterConfigParser {
  readonly file: FileES;
  readonly as: typeof handleAstStatement;
  readonly pathHelper: FileESPathHelper;
  constructor(filename: string, pathHelper: FileESPathHelper) {
    this.file = new FileES({ filename, fileContent: readFileSync(filename) });
    this.pathHelper = pathHelper;
    this.as = handleAstStatement;
  }

  private getDeclarationAst(name: string) {
    const file = this.file;
    if (file) {
      const routesAst = file.filter
        .filter(file.ast!.body, [AST_NODE_TYPES.VariableDeclaration])
        .map((node) => {
          return file.filter
            .filter(node.declarations, [AST_NODE_TYPES.VariableDeclarator])
            .filter((declarator) => {
              return (
                declarator.id.type === AST_NODE_TYPES.Identifier &&
                declarator.id.name === name
              );
            })[0];
        })
        .filter((declarator) => Boolean(declarator))[0];
      return routesAst.init;
    }
  }

  private getRoutesValue(): Config[] | undefined {
    const defaultExport = this.file.getDefaultExport()?.name;
    const routesExpression = this.getDeclarationAst(defaultExport!);
    if (routesExpression?.type === AST_NODE_TYPES.ArrayExpression) {
      return this.as.handleArrayExpression(routesExpression);
    }
  }

  private handleIdentifierComponent(
    config: BaseConfig<{ type: "Identifier"; name: string }>
  ) {
    const ast = this.getDeclarationAst(config.component.name);
    if (ast) {
      const rawCode = this.file.fileContent.slice(...ast.range);
      const rawFilename = rawCode.match(/import\(["'](.+)["']\)/)?.[1];
      if (rawFilename) {
        console.log("debugger", this.file.filename, rawFilename);
        const filename = this.pathHelper.resolveImportFilename(
          this.file.filename,
          rawFilename
        );
        if (filename) {
          const manager = new FileESManager(filename, {
            alias: { "@": path.resolve("./src") },
          });
          manager.getTerminalImportList();
          console.log(config.component.name);
          console.log(manager.flatImportList.map((item) => item.filename));
        }
      }
    } else {
      console.log(`Not found ${config.component.name} variable declarator.`);
    }
  }

  private handleFile(config: Config[]) {
    config.forEach((conf) => {
      if (typeof conf.component !== "string") {
        switch (conf.component.type) {
          case "Identifier":
            this.handleIdentifierComponent(
              conf as BaseConfig<{ name: string; type: "Identifier" }>
            );
            break;
        }
      }
      if (conf.routes) {
        this.handleFile(conf.routes);
      }
    });
  }

  runRoutesFile() {
    const config = this.getRoutesValue();
    if (config) {
      this.handleFile(config);
    }
  }
}

export default ReactRouterConfigParser;
