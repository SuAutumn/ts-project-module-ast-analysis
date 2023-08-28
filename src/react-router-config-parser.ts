import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree";
import FileESManager from "./file-es-manager";
import handleAstStatement from "./utils/handle-ast-statement";
import FileESPathHelper from "./file-es-path-helper";
import path from "path";

interface Config {
  path: { value: string; type: "Literal" };
  componentId: { value: string; type: "Literal" };
  component:
    | string
    | { name: string; type: "Identifier" }
    | { body: string; type: "ArrowFunctionExpression" | "FunctionExpression" };
  routes?: Config[];
}

class ReactRouterConfigParser {
  readonly manager: FileESManager;
  readonly as: typeof handleAstStatement;
  constructor(manager: FileESManager) {
    this.manager = manager;
    this.as = handleAstStatement;
  }

  getDeclarationAst(name: string) {
    const file = this.manager.file;
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

  getRoutesValue(): Config[] | undefined {
    const defaultExport = this.manager.file?.getDefaultExport()?.name;
    const routesExpression = this.getDeclarationAst(defaultExport!);
    if (routesExpression?.type === AST_NODE_TYPES.ArrayExpression) {
      return this.as.handleArrayExpression(routesExpression);
    }
  }

  handleFile(config: Config[]) {
    config.forEach(async (conf) => {
      if (typeof conf.component !== "string") {
        switch (conf.component.type) {
          case "Identifier":
            const ast = this.getDeclarationAst(conf.component.name);
            if (ast) {
              const rawCode = this.manager.file.fileContent.slice(...ast.range);
              const rawFilename = rawCode.match(/import\(["'](.+)["']\)/)?.[1];
              if (rawFilename) {
                const pathHelper = new FileESPathHelper({
                  alias: { "@": path.resolve("./src") },
                  supportedExt: FileESManager.SUPPORTED_EXT,
                });
                const filename = pathHelper.resolveImportFilename(
                  this.manager.filename,
                  rawFilename
                );
                if (filename) {
                  const manager = new FileESManager(filename, {
                    alias: { "@": path.resolve("./src") },
                  });
                  await manager.getTerminalImportList();
                  console.log(manager.flatImportList);
                }
              }
            } else {
              console.log(`Not found ${conf.component.name}`);
            }
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
