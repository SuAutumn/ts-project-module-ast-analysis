export interface TreeData<T> {
  data: T;
  children?: TreeData<T>[];
}

export interface Cache<Data, CacheKey> {
  has(key: CacheKey): boolean;

  get(key: CacheKey): Data | undefined;

  set(key: CacheKey, data: Data): Data;
}

export interface FileESConstructorParams {
  filename: string;
  fileContent?: string;
}

export type FileESManagerOptions = { alias?: Record<string, string> };

export interface FileESPathHelperConstructorParams {
  alias?: Record<string, string>;
  supportedExt?: string[];
}
