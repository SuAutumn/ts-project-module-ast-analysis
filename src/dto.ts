import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/typescript-estree";

export interface TreeData<T> {
  data: T;
  children?: TreeData<T>[];
}

export interface Cache<Data, CacheKey> {
  has(key: CacheKey): boolean;

  get(key: CacheKey): Data | undefined;

  set(key: CacheKey, data: Data): Data;
}

/** 导出内容 */
export type ExportItem = { type: AST_NODE_TYPES; name: string };

export interface FileESConstructorParams {
  filename: string;
  fileContent?: string;
}

export type FileESManagerOptions = { alias?: Record<string, string> };

export interface FileESPathHelperConstructorParams {
  alias?: Record<string, string>;
  supportedExt?: string[];
}

export interface BaseConfig<T> {
  path?: SimpleObjectNode<AST_NODE_TYPES.Literal>;
  componentId?: SimpleObjectNode<AST_NODE_TYPES.Literal>;
  component?: T;
  render?: T;
  routes?: Config[];
  type?: AST_NODE_TYPES.SpreadElement;
  value?: SimpleObjectNode<AST_NODE_TYPES.Identifier>;
}

export type Config = BaseConfig<
  | SimpleObjectNode<
      | AST_NODE_TYPES.Identifier
      | AST_NODE_TYPES.FunctionExpression
      | AST_NODE_TYPES.ArrowFunctionExpression
    >
  | ReturnHandleCallExpression
>;

// ast types
export const NOT_HANDLED = "Not handled";
export type SimpleObjectNode<
  T extends AST_NODE_TYPES = AST_NODE_TYPES,
  SubType extends AST_NODE_TYPES = AST_NODE_TYPES
> = {
  type: T;
  value: undefined | string | SimpleObjectNode<SubType>;
};
export type ReturnHandleCallExpression = {
  type: AST_NODE_TYPES.CallExpression;
  callee: SimpleObjectNode | ReturnHandleCallExpression;
  arguments: (SimpleObjectNode | ReturnHandleCallExpression)[];
};
