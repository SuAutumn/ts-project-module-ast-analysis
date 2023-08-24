import FileES from "./file-es";

interface Cache<Data, CacheKey> {
  get(key: CacheKey): Data | undefined;
  set(key: CacheKey, data: Data): Data;
}

/**
 * 文件缓存容器
 */
class FileESCache implements Cache<FileES, string> {
  private cache: Record<string, FileES> = {};

  get(filename: string) {
    if (this.cache[filename]) return this.cache[filename];
  }

  set(filename: string, fileES: FileES) {
    if (this.get(filename) !== fileES) {
      this.cache[filename] = fileES;
    }
    return fileES;
  }
}

export default new FileESCache();
