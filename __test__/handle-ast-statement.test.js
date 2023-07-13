import { AST_NODE_TYPES, parse } from "@typescript-eslint/typescript-estree";
import HandleAstStatement from "../src/utils/handle-ast-statement";

describe("Test handle ast statement.", () => {
  const variableDeclaration = `
    const a = 1;
    const [a, c = 1, { d }, ...rest] = b;
    const {a, b} = a;
  `;
  it("Test VariableDeclaration", () => {
    const ast = parse(variableDeclaration);
    const h = new HandleAstStatement();
    const a = ast.body.map((d) => {
      return d.declarations?.map((item) => {
        return h.handleBindingName(item.id);
      });
    });
    expect(a.flat(Infinity)).toMatchObject([
      "a",
      "a",
      "c",
      "d",
      "rest",
      "a",
      "b",
    ]);
  });
});
