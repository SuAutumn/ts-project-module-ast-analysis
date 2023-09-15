import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/typescript-estree";
import FileES from "./file-es";
import FileESPathHelper from "./file-es-path-helper";
import filterAstStatement from "./utils/filter-ast-statement";
import { readFileSync } from "./utils/read-file";
import { is } from "./utils/asset-ast-statement";

export interface ReactApisConfigParseInterface {
  getApisValue(): Promise<ApiControllerInterface>;
}

export interface ApiActionInterface {
  method: string;
  path: string;
}

export interface ApiControllerInterface {
  [action: string]: Record<string, ApiActionInterface> | undefined;
}

export type ImportExportReturn = [TSESTree.ObjectExpression?, FileES?];

const IGNORE_CONTROLLER_KEYS = ["host", "mockHost"];

class ReactApisConfigParse implements ReactApisConfigParseInterface {
  private file: FileES;
  private pathHelper: FileESPathHelper;
  private astFilter = filterAstStatement;

  constructor(filename: string, pathHelper: FileESPathHelper) {
    this.file = new FileES({ filename, fileContent: readFileSync(filename) });
    this.pathHelper = pathHelper;
  }

  private getImportInfo(name: string, file: FileES) {
    return file.importList?.find((item) =>
      item.nameList?.some((m) => m?.name === name)
    );
  }

  private getActionsPathPrefix(nodes?: TSESTree.ObjectLiteralElement[]) {
    const prefixNode = nodes?.find(
      (m) =>
        is(m, AST_NODE_TYPES.Property) &&
        is(m.key, AST_NODE_TYPES.Identifier) &&
        m.key.name === "prefix"
    );
    if (prefixNode) {
      if (
        is(prefixNode, AST_NODE_TYPES.Property) &&
        is(prefixNode.value, AST_NODE_TYPES.Literal)
      ) {
        return prefixNode.value.value;
      }
    }
  }

  private parseActionsConfig(nodes?: TSESTree.ObjectLiteralElement[]) {
    if (!nodes) {
      return;
    }
    const prefix = this.getActionsPathPrefix(nodes);
    const actions: Record<string, ApiActionInterface> = {};
    for (const action of nodes) {
      if (
        is(action, AST_NODE_TYPES.Property) &&
        is(action.key, AST_NODE_TYPES.Identifier) &&
        is(action.value, AST_NODE_TYPES.ObjectExpression)
      ) {
        const p = action.value.properties[0];
        if (
          is(p, AST_NODE_TYPES.Property) &&
          is(p.key, AST_NODE_TYPES.Identifier) &&
          is(p.value, AST_NODE_TYPES.Literal)
        ) {
          actions[action.key.name] = {
            method: p.key.name,
            path: `${prefix}${p.value.value}`,
          };
        }
      }
    }
    return actions;
  }

  async getImportFileExportObject(
    importName: string,
    file: FileES = this.file
  ): Promise<ImportExportReturn> {
    const importSource = this.getImportInfo(importName, file);
    if (importSource) {
      const source = importSource.source;
      const importPath = this.pathHelper.resolveImportFilename(
        file.filename,
        source
      );
      const importFile = new FileES({
        filename: importPath!,
        fileContent: readFileSync(importPath!),
      });
      const actionExpression = this.getDefaultExportObject(importFile);
      return [actionExpression, importFile];
    }
    return [];
  }

  async getActions(controllerName: string, file: FileES = this.file) {
    const [actionExpression] = await this.getImportFileExportObject(
      controllerName,
      file
    );
    if (actionExpression) {
      if (this.isActionsAst(actionExpression?.properties)) {
        return this.parseActionsConfig(actionExpression?.properties);
      }
      // TODO: 后面需要处理递归引用问题
    }
  }

  private isActionsAst(nodes?: TSESTree.ObjectLiteralElement[]) {
    if (nodes) {
      return nodes.some((m) => {
        if (
          is(m, AST_NODE_TYPES.Property) &&
          is(m.key, AST_NODE_TYPES.Identifier)
        ) {
          return m.key.name === "prefix";
        }
        return false;
      });
    }
    return false;
  }

  private async parseSpreadElement(spreadName: string) {
    const [actionExpression, importFile] = await this.getImportFileExportObject(
      spreadName
    );
    const controllers: ApiControllerInterface = {};
    if (actionExpression) {
      for await (const actions of actionExpression.properties) {
        if (
          is(actions, AST_NODE_TYPES.Property) &&
          is(actions.key, AST_NODE_TYPES.Identifier) &&
          is(actions.value, AST_NODE_TYPES.Identifier)
        ) {
          const action = await this.getActions(actions.value.name, importFile);
          if (action) {
            controllers[actions.key.name] = action;
          }
        }
      }
    }
    return controllers;
  }

  private async getControllers(apisExpression: TSESTree.ObjectExpression) {
    let apiControllers: ApiControllerInterface = {};
    for await (const node of apisExpression.properties) {
      switch (node.type) {
        case AST_NODE_TYPES.Property:
          if (is(node.key, AST_NODE_TYPES.Identifier)) {
            if (!IGNORE_CONTROLLER_KEYS.includes(node.key.name)) {
              const action = await this.getActions(node.key.name);
              apiControllers[node.key.name] = action;
            }
          }
          break;
        case AST_NODE_TYPES.SpreadElement:
          if (is(node.argument, AST_NODE_TYPES.Identifier)) {
            const action = await this.parseSpreadElement(node.argument.name);
            apiControllers = { ...apiControllers, ...action };
          }
          break;
        default:
          break;
      }
    }
    return apiControllers;
  }

  /** 找到和name匹配的VariableDeclarator */
  private getNamedDeclaration(name: string) {
    const file = this.file;
    return this.astFilter
      .filter(file.ast?.body, [AST_NODE_TYPES.VariableDeclaration])
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

  private getDefaultExportObject(file?: FileES) {
    if (file) {
      const apisExpression = this.astFilter.filter(file.ast?.body, [
        AST_NODE_TYPES.ExportDefaultDeclaration,
      ])[0]?.declaration;
      if (is(apisExpression, AST_NODE_TYPES.ObjectExpression)) {
        return apisExpression;
      }
      if (is(apisExpression, AST_NODE_TYPES.Identifier)) {
        const node = this.getNamedDeclaration(apisExpression.name);
        if (is(node?.init, AST_NODE_TYPES.ObjectExpression)) {
          return node?.init;
        }
        console.error("暂时不支持当前文件类型的解析");
      }
    }
  }

  async getApisValue() {
    const defaultExport = this.file.getDefaultExport()?.name;
    if (defaultExport) {
      const apisExpression = this.getDefaultExportObject(this.file);
      if (apisExpression) {
        const apiConfigs = await this.getControllers(apisExpression);
        return apiConfigs;
      }
    }
    return {};
  }
}

export default ReactApisConfigParse;
