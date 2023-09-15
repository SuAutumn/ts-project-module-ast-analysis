import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/typescript-estree";

class FilterAstStatement {
  filter<T extends AST_NODE_TYPES = AST_NODE_TYPES>(
    node: TSESTree.Node[] | undefined | null,
    types: Array<T>
  ) {
    return (node || []).filter((n) => {
      return types.includes(n.type as T);
    }) as Extract<TSESTree.Node, { type: T }>[];
  }
  filterImportDeclaration(node: TSESTree.ProgramStatement[] = []) {
    return this.filter(node, [AST_NODE_TYPES.ImportDeclaration]).filter(
      (n) => n.importKind === "value"
    );
  }

  filterExportDeclaration(node: TSESTree.ProgramStatement[] = []) {
    return this.filter(node, [
      AST_NODE_TYPES.ExportAllDeclaration,
      AST_NODE_TYPES.ExportDefaultDeclaration,
      AST_NODE_TYPES.ExportNamedDeclaration,
    ]).filter((n) => n.exportKind === "value");
  }

  filterVariableDeclaration(node: TSESTree.ProgramStatement[] = []) {
    return this.filter(node, [
      AST_NODE_TYPES.VariableDeclaration,
      AST_NODE_TYPES.ClassDeclaration,
      AST_NODE_TYPES.FunctionDeclaration,
    ]);
  }
}

export default new FilterAstStatement();
