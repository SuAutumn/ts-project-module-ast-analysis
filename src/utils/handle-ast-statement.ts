import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/typescript-estree";

class HandleAstStatement {
  handleBindingName(node: TSESTree.BindingName) {
    switch (node.type) {
      case AST_NODE_TYPES.Identifier:
        return this.handleIdentifier(node);
      case AST_NODE_TYPES.ArrayPattern:
        return this.handleArrayPatter(node);
      case AST_NODE_TYPES.ObjectPattern:
        return this.handleObjectPatter(node);
    }
  }

  handleVariableDeclarator(node: TSESTree.VariableDeclarator) {
    return this.handleBindingName(node.id);
  }

  handleVariableDeclaratorList(node: TSESTree.VariableDeclarator[]) {
    return node.map(this.handleVariableDeclarator.bind(this));
  }

  handleClassDeclaration(node: TSESTree.ClassDeclaration) {
    if (node.id) {
      return this.handleIdentifier(node.id);
    }
  }
  handleFunctionDeclaration(node: TSESTree.FunctionDeclaration) {
    if (node.id) {
      return this.handleIdentifier(node.id);
    }
  }
  handleIdentifier(node: TSESTree.Identifier) {
    return node.name;
  }

  handleLiteral(node: TSESTree.Literal) {
    return node.value;
  }

  handleRestElement(node: TSESTree.RestElement) {
    return this.handleDestructuringPattern(node.argument);
  }

  handleMemberExpression(node: TSESTree.MemberExpression) {
    throw new Error("Not implement MemberExpression");
  }

  handleArrayPatter(node: TSESTree.ArrayPattern) {
    return node.elements.map((e) => this.handleDestructuringPattern(e));
  }

  handleObjectPatter(node: TSESTree.ObjectPattern) {
    return node.properties.map((e) => this.handlePropertyOrRestElement(e));
  }

  handleAssignmentPattern(node: TSESTree.AssignmentPattern) {
    return this.handleBindingName(node.left);
  }

  handlePropertyNonComputedName(node: TSESTree.PropertyNonComputedName) {
    const { key } = node;
    switch (key.type) {
      case AST_NODE_TYPES.Identifier:
        return this.handleIdentifier(key);
      case AST_NODE_TYPES.Literal:
        return this.handleLiteral(key);
    }
  }

  handleDestructuringPattern(node: TSESTree.DestructuringPattern | null): any {
    if (node === null) return;
    switch (node.type) {
      case AST_NODE_TYPES.RestElement:
        return this.handleRestElement(node);
      case AST_NODE_TYPES.ObjectPattern:
        return this.handleObjectPatter(node);
      case AST_NODE_TYPES.ArrayPattern:
        return this.handleArrayPatter(node);
      case AST_NODE_TYPES.AssignmentPattern:
        return this.handleAssignmentPattern(node);
      case AST_NODE_TYPES.Identifier:
        return this.handleIdentifier(node);
      case AST_NODE_TYPES.MemberExpression:
        return this.handleMemberExpression(node);
    }
  }
  handlePropertyOrRestElement(node: TSESTree.Property | TSESTree.RestElement) {
    switch (node.type) {
      case AST_NODE_TYPES.Property:
        if (!node.computed) {
          return this.handlePropertyNonComputedName(node);
        }
        return;
      case AST_NODE_TYPES.RestElement:
        return this.handleRestElement(node);
    }
  }
}

export default new HandleAstStatement();
