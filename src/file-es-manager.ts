import FileES from "./file-es";
import * as path from "path";
import readFile from "./utils/read-file";
import * as fs from "fs";

interface FileESManagerInterface {
  filename: string;
  terminalImportList: FileES[];
  walkTree(filename: string, name: string): Promise<void>;
}
class FileESManager implements FileESManagerInterface {
  filename: string;
  terminalImportList: FileES[] = [];
  private cache: { [x: string]: FileES } = {};

  static SUPPORTED_EXT = [".js", ".jsx", ".ts", ".tsx"];

  constructor(filename: string) {
    this.filename = path.resolve(filename);
  }

  getFilenameFromAnother(source: string, target: string) {
    const dirname = path.dirname(source);
    const filename = path.resolve(dirname, target);
    if (path.extname(filename) === "") {
      return this.getFilenameLikeModuleResolution(filename);
    }
    if (fs.existsSync(filename)) {
      return filename;
    }
    console.log(`${filename} not exist.`);
  }

  getFilenameLikeModuleResolution(filename: string) {
    const ext = [...FileESManager.SUPPORTED_EXT, ".json"];
    const extFiles = ext.map((e) => `${filename}${e}`);
    const childFiles = ext.map((e) => path.resolve(filename, `./index${e}`));
    const composeFiles = [...extFiles, ...childFiles];
    let i = 0;
    while (i < composeFiles.length) {
      const name = composeFiles[i++];
      if (fs.existsSync(name)) {
        return name;
      }
    }
    console.log(`${filename} not exist.`);
  }

  async createFileES(filename: string) {
    if (this.cache[filename]) {
      return this.cache[filename];
    }
    const fileContent = await readFile(filename);
    const fileES = new FileES({ fileContent, filename });
    this.cache[filename] = fileES;
    return fileES;
  }

  async getTerminalImportList() {
    await this.walkRoot(this.filename);
  }

  async walkTreeNext(filename: string, source: string, name: string) {
    const sourceFilename = this.getFilenameFromAnother(filename, source);
    if (sourceFilename) {
      await this.walkTree(sourceFilename, name);
    }
  }

  astParseable(filename: string) {
    return FileESManager.SUPPORTED_EXT.includes(path.extname(filename));
  }

  updateTerminalImportList(file: FileES) {
    if (this.terminalImportList.includes(file)) {
      return;
    }
    this.terminalImportList.push(file);
  }

  async walkRoot(filename: string) {
    const childFileES = await this.createFileES(filename);

    if (!childFileES.ast) {
      this.updateTerminalImportList(childFileES);
      return;
    }

    const list = childFileES.getFlatImportOrExportList(childFileES.importList);
    for (let i = 0; i < list.length; i++) {
      const { name, source } = list[i];
      if (!name || name === "*") {
        /**
         * import "./a" or import * as a from "./a"
         * 直接当作有副作用的依赖记录
         */
        const nextFilename = this.getFilenameFromAnother(filename, source!);
        if (nextFilename) {
          const nextFileES = await this.createFileES(nextFilename);
          if (nextFileES) this.updateTerminalImportList(nextFileES);
        }
      } else {
        await this.walkTreeNext(filename, source!, name);
      }
    }
  }

  async walkTree(filename: string, name: string): Promise<void> {
    const childFileES = await this.createFileES(filename);
    if (!childFileES.ast) {
      this.updateTerminalImportList(childFileES);
      return;
    }
    const { source: exportSource, name: exportName } =
      childFileES.getExportByName(name) || {};
    if (exportSource) {
      /** 透传export */
      await this.walkTreeNext(filename, exportSource, name);
      return;
    }
    if (exportName) {
      const importItem = childFileES.getImportByName(exportName);
      if (importItem) {
        /** 透传export */
        await this.walkTreeNext(filename, importItem.source!, name);
        return;
      }
      this.updateTerminalImportList(childFileES);
      await this.walkRoot(childFileES.filename);
      return;
    }
    const implicitExportList = childFileES.getImplicitExportList();
    if (implicitExportList.length > 0) {
      for (let i = 0; i < implicitExportList.length; i++) {
        await this.walkTreeNext(filename, implicitExportList[i].source!, name);
      }
      return;
    }
  }
}

export default FileESManager;
