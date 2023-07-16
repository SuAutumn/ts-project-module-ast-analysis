import FileES from "./file-es";

class FileESCache {
  private cache: Record<string, FileES> = {};
  getCacheFileES(filename: string) {
    if (this.cache[filename]) return this.cache[filename];
  }
  updateCacheFileES(filename: string, fileES: FileES) {
    if (this.getCacheFileES(filename) !== fileES) {
      this.cache[filename] = fileES;
    }
    return fileES;
  }
}

export default new FileESCache();
