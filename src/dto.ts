import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree";

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

interface BaseConfig<T> {
  path: { value: string; type: "Literal" };
  componentId?: { value: string; type: "Literal" };
  component?: T;
  render?: T;
  routes?: Config[];
}

export type Config =
  | BaseConfig<string>
  | BaseConfig<{ name: string; type: "Identifier" }>
  | BaseConfig<{
      body: string;
      type: "ArrowFunctionExpression" | "FunctionExpression";
    }>;
