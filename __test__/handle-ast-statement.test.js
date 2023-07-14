import {
  AST_NODE_TYPES,
  parse,
  TSESTree,
} from "@typescript-eslint/typescript-estree";
import handleAstStatement from "../src/utils/handle-ast-statement";
import filterAstStatement from "../src/utils/filter-ast-statement";

describe("Test handle ast statement.", () => {
  const variableDeclaration = `
    const a = 1;
    const [a, c = 1, { d }, ...rest] = b;
    const {a, b} = a;
  `;
  it("Test VariableDeclaration", () => {
    const ast = parse(variableDeclaration);
    const variableDeclarationList = filterAstStatement.filter(ast.body, [
      AST_NODE_TYPES.VariableDeclaration,
    ]);
    /** @type string[] */
    let result = [];
    variableDeclarationList.forEach((item) => {
      const nameList = handleAstStatement
        .handleVariableDeclaratorList(item.declarations)
        .flat(Infinity);
      result = [...result, ...nameList];
    });
    expect(result).toMatchObject(["a", "a", "c", "d", "rest", "a", "b"]);
  });
});
