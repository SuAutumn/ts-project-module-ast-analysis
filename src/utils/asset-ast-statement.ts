import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/typescript-estree";

export function is<T extends AST_NODE_TYPES = AST_NODE_TYPES>(
  node: TSESTree.Node | null | undefined,
  type: T
): node is Extract<TSESTree.Node, { type: T }> {
  return node?.type === type;
}
