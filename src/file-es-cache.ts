import FileES from "./file-es";

interface Cache<Data, CacheKey> {
  has(key: CacheKey): boolean;
  get(key: CacheKey): Data | undefined;
  set(key: CacheKey, data: Data): Data;
}

/**
 * 文件缓存容器
 */
class FileESCache implements Cache<FileES, string> {
  private cache: Record<string, FileES> = {};

  get(filename: string) {
    if (this.has(filename)) return this.cache[filename];
  }

  set(filename: string, fileES: FileES) {
    if (this.get(filename) !== fileES) {
      this.cache[filename] = fileES;
    }
    return fileES;
  }

  has(filename: string): boolean {
    return Boolean(this.cache[filename]);
  }
}

export default new FileESCache();
