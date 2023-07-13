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

  constructor(filename: string) {
    this.filename = path.resolve(filename);
  }

  getFilenameFromAnother(source: string, target: string) {
    const dirname = path.dirname(source);
    const filename = path.resolve(dirname, target);
    const parsedPath = path.parse(filename);
    if (parsedPath.ext === "") {
      return this.getFilenameLikeModuleResolution(filename);
    }
    if (fs.existsSync(filename)) {
      return filename;
    }
    console.log(`${filename} not exist.`);
  }

  getFilenameLikeModuleResolution(filename: string) {
    const extFiles = [".js", ".ts", ".jsx", ".tsx", ".json"];
    const childFiles = extFiles.map((ext) => `/index${ext}`);
    const composeFiles = [...extFiles, ...childFiles];
    let i = 0;
    while (i < composeFiles.length) {
      const f = `${filename}${composeFiles[i++]}`;
      if (fs.existsSync(f)) {
        return f;
      }
    }
    console.log(`${filename} not exist.`);
  }

  async createFileES(filename: string) {
    if (this.cache[filename]) {
      return this.cache[filename];
    }
    const fileContent = await readFile(filename);
    const f = new FileES({ fileContent, filename });
    this.cache[filename] = f;
    return f;
  }

  async getTerminalImportList() {
    await this.walkTree(this.filename);
  }

  async walkTreeNext(filename: string, source: string, name?: string) {
    const sourceFilename = this.getFilenameFromAnother(filename, source);
    if (sourceFilename) {
      await this.walkTree(sourceFilename, name);
    }
  }

  updateTerminalImportList(file: FileES) {
    if (this.terminalImportList.includes(file)) {
      return;
    }
    this.terminalImportList.push(file);
  }

  async walkTree(filename: string, name?: string): Promise<void> {
    const childFileES = await this.createFileES(filename);
    if (name === undefined) {
      /** 发起walkTree */
      this.updateTerminalImportList(childFileES);
      const list = childFileES.getFlatImportOrExportList(
        childFileES.importList
      );
      for (let i = 0; i < list.length; i++) {
        const { name, source } = list[i];
        if (!name || name === "*") {
          await this.walkTreeNext(filename, source!);
        } else {
          await this.walkTreeNext(filename, source!, name);
        }
      }
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
      await this.walkTree(childFileES.filename);
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
