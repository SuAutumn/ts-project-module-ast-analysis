export interface TreeData<T> {
  data: T;
  children?: TreeData<T>[];
}

export interface Cache<Data, CacheKey> {
  has(key: CacheKey): boolean;

  get(key: CacheKey): Data | undefined;

  set(key: CacheKey, data: Data): Data;
}
