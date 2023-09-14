import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/typescript-estree";
import filterAstStatement from "./filter-ast-statement";
import {
  NOT_HANDLED,
  ReturnHandleCallExpression,
  SimpleObjectNode,
} from "../dto";

class HandleAstStatement {
  handleBindingName(node: TSESTree.BindingName) {
    switch (node.type) {
      case AST_NODE_TYPES.Identifier:
        return this.handleIdentifier(node);
      case AST_NODE_TYPES.ArrayPattern:
        return this.handleArrayPattern(node);
      case AST_NODE_TYPES.ObjectPattern:
        return this.handleObjectPattern(node);
    }
  }

  handleVariableDeclaration(node: TSESTree.VariableDeclaration) {
    return this.handleVariableDeclaratorList(node.declarations);
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
    return node.name.replace(/['"]/g, "");
  }

  handleLiteral(node: TSESTree.Literal) {
    return node.raw.replace(/['"]/g, "");
  }

  handleRestElement(node: TSESTree.RestElement) {
    return this.handleDestructuringPattern(node.argument);
  }

  handleMemberExpression(node: TSESTree.MemberExpression) {
    return `Not handle ${node.type}`;
  }

  handleArrayPattern(node: TSESTree.ArrayPattern) {
    return node.elements.map((e) => this.handleDestructuringPattern(e));
  }

  handleObjectPattern(node: TSESTree.ObjectPattern) {
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
      default:
        return "";
    }
  }

  handleDestructuringPattern(
    node: TSESTree.DestructuringPattern | null
  ): string | undefined | any[] {
    if (node === null) return;
    switch (node.type) {
      case AST_NODE_TYPES.RestElement:
        return this.handleRestElement(node);
      case AST_NODE_TYPES.ObjectPattern:
        return this.handleObjectPattern(node);
      case AST_NODE_TYPES.ArrayPattern:
        return this.handleArrayPattern(node);
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
        return this.handlePropertyName(node);
      case AST_NODE_TYPES.RestElement:
        return this.handleRestElement(node);
    }
  }

  handleNameExportDeclarations(node: TSESTree.NamedExportDeclarations) {
    const { type } = node;
    switch (type) {
      case AST_NODE_TYPES.ClassDeclaration:
        return this.handleClassDeclaration(node);
      case AST_NODE_TYPES.FunctionDeclaration:
        return this.handleFunctionDeclaration(node);
      case AST_NODE_TYPES.VariableDeclaration:
        return this.handleVariableDeclaration(node);
      default:
        return;
    }
  }

  handlePropertyName(
    node: TSESTree.PropertyComputedName | TSESTree.PropertyNonComputedName
  ) {
    if (!node.computed) {
      return this.handlePropertyNonComputedName(node);
    }
    return "";
  }

  handleLeftHandSideExpression(
    node: TSESTree.LeftHandSideExpression
  ): SimpleObjectNode | ReturnHandleCallExpression {
    switch (node.type) {
      case AST_NODE_TYPES.Identifier:
        return {
          type: node.type,
          value: this.handleIdentifier(node),
        };
      case AST_NODE_TYPES.CallExpression:
        return this.handleCallExpression(node);
      default:
        return {
          type: node.type,
          value: NOT_HANDLED,
        };
    }
  }

  handleCallExpressionArgument(
    list: TSESTree.CallExpressionArgument[]
  ): (SimpleObjectNode | ReturnHandleCallExpression)[] {
    return list.map((node) => {
      switch (node.type) {
        case AST_NODE_TYPES.Identifier:
          return {
            type: node.type,
            value: this.handleIdentifier(node),
          };
        case AST_NODE_TYPES.Literal:
          return {
            type: node.type,
            value: this.handleLiteral(node),
          };
        case AST_NODE_TYPES.CallExpression:
          return this.handleCallExpression(node);
        default:
          return {
            type: node.type,
            value: NOT_HANDLED,
          };
      }
    });
  }

  handleCallExpression(
    node: TSESTree.CallExpression
  ): ReturnHandleCallExpression {
    const leftHandSide = this.handleLeftHandSideExpression(node.callee);
    const args = this.handleCallExpressionArgument(node.arguments);
    return {
      type: node.type,
      callee: leftHandSide,
      arguments: args,
    };
  }

  handleJSXIdentifier(node: TSESTree.JSXIdentifier) {
    return node.name;
  }
  handleJSXElement(node: TSESTree.JSXElement) {
    switch (node.openingElement.name.type) {
      case AST_NODE_TYPES.JSXIdentifier:
        return this.handleJSXIdentifier(node.openingElement.name);
      default:
        return `Not handle ${node.openingElement.name.type}`;
    }
  }

  handleBlockStatementReturn(node: TSESTree.BlockStatement) {
    const statementReturn = filterAstStatement.filter(node.body, [
      AST_NODE_TYPES.ReturnStatement,
    ])[0];
    if (statementReturn && statementReturn.argument) {
      switch (statementReturn.argument.type) {
        case AST_NODE_TYPES.JSXElement:
          return this.handleJSXElement(statementReturn.argument);
        default:
          return `Not handle ${statementReturn.argument.type}`;
      }
    }
  }
  handleArrowFunctionExpression(node: TSESTree.ArrowFunctionExpression) {
    switch (node.body.type) {
      case AST_NODE_TYPES.JSXElement:
        return this.handleJSXElement(node.body);
      case AST_NODE_TYPES.BlockStatement:
        return this.handleBlockStatementReturn(node.body);
      default:
        return `Not handle ${node.body.type}`;
    }
  }

  handleFunctionExpression(node: TSESTree.FunctionExpression) {
    switch (node.body.type) {
      case AST_NODE_TYPES.BlockStatement:
        return this.handleBlockStatementReturn(node.body);
      default:
        return `Not handle ${node.body.type}`;
    }
  }

  handlePropertyValue(
    node: TSESTree.Property["value"]
  ): SimpleObjectNode | Record<string, any> {
    switch (node.type) {
      case AST_NODE_TYPES.Identifier:
        const name = this.handleIdentifier(node);
        return { type: node.type, value: name };
      case AST_NODE_TYPES.Literal:
        return { value: this.handleLiteral(node), type: node.type };
      case AST_NODE_TYPES.CallExpression:
        return this.handleCallExpression(node);
      case AST_NODE_TYPES.ArrayExpression:
        return this.handleArrayExpression(node);
      case AST_NODE_TYPES.ArrayPattern:
        return this.handleArrayPattern(node);
      case AST_NODE_TYPES.ArrowFunctionExpression:
        const body = this.handleArrowFunctionExpression(node);
        return { type: node.type, value: body };
      case AST_NODE_TYPES.FunctionExpression:
        const functionBody = this.handleFunctionExpression(node);
        return { type: node.type, value: functionBody };
      default:
        return {
          type: node.type,
          value: NOT_HANDLED,
        };
    }
  }
  handleObjectExpression(node: TSESTree.ObjectExpression) {
    const obj: Record<string, any> = {};
    node.properties.forEach((prop) => {
      switch (prop.type) {
        case AST_NODE_TYPES.Property:
          obj[this.handlePropertyName(prop)] = this.handlePropertyValue(
            prop.value
          );
          break;
        case AST_NODE_TYPES.SpreadElement:
          break;
      }
    });
    return obj;
  }
  handleSpreadElement(node: TSESTree.SpreadElement): SimpleObjectNode {
    switch (node.argument.type) {
      case AST_NODE_TYPES.Identifier:
        return {
          type: node.argument.type,
          value: this.handleIdentifier(node.argument),
        };
      default:
        return {
          type: node.argument.type,
          value: NOT_HANDLED,
        };
    }
  }
  handleArrayExpression(
    node: TSESTree.ArrayExpression
  ): (SimpleObjectNode | Record<string, any>)[] {
    return node.elements
      .filter(
        (ele): ele is TSESTree.SpreadElement | TSESTree.Expression =>
          ele !== null
      )
      .map((ele) => {
        switch (ele.type) {
          case AST_NODE_TYPES.ObjectExpression:
            return this.handleObjectExpression(ele);
          case AST_NODE_TYPES.ArrayExpression:
            return this.handleArrayExpression(ele);
          case AST_NODE_TYPES.SpreadElement:
            return {
              type: ele.type,
              value: this.handleSpreadElement(ele),
            };
          default:
            return {
              type: ele.type,
              value: NOT_HANDLED,
            };
        }
      });
  }
}

export default new HandleAstStatement();
