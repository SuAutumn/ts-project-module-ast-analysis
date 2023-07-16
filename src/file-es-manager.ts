import FileES, { ExportFlatDataInterface } from "./file-es";
import * as path from "path";
import readFile from "./utils/read-file";
import * as fs from "fs";
import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree";
import * as process from "process";

type ExportItem = { type: AST_NODE_TYPES; name: string };

type FileESManagerOptions = { alias?: Record<string, string> };
interface FileESManagerInterface {
  filename: string;
  options: FileESManagerOptions;
  /** 通过分析导入导出依赖，获得模块的最终文件的依赖 */
  terminalImportList: FileES[];
  /** 遍历 file export list 元素，查找是否存在name一致的导出 */
  walkTree(filename: string, exportItem: ExportItem): Promise<void>;
  /** 检查新的filename是否存在，存在继续walkTree */
  walkTreeNext(
    filename: string,
    source: string,
    exportItem: ExportItem
  ): Promise<void>;
}
class FileESManager implements FileESManagerInterface {
  filename: string;
  terminalImportList: FileES[] = [];
  options: FileESManagerOptions;
  private cache: { [x: string]: FileES } = {};

  static SUPPORTED_EXT = [
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".json",
    ".less",
    ".scss",
    ".css",
    ".png",
    ".svg",
    ".jpeg",
  ];

  constructor(filename: string, options: FileESManagerOptions = {}) {
    this.filename = path.resolve(filename);
    this.options = options;
  }

  aliasPathHelper(source: string) {
    if (this.options.alias) {
      const keys = Object.keys(this.options.alias);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const lastChar = key.slice(-1) === "/" ? "" : "/";
        if (source.startsWith(`${keys[i]}${lastChar}`)) {
          return source.replace(keys[i], this.options.alias[keys[i]]);
        }
      }
    }
    return source;
  }

  getFilenameFromAnother(source: string, target: string) {
    const aliasTarget = this.aliasPathHelper(target);
    if (aliasTarget.startsWith("/") || aliasTarget.startsWith(".")) {
      const dirname = path.dirname(source);
      const filename = path.resolve(dirname, aliasTarget);
      if (path.extname(filename) === "") {
        return this.getFilenameLikeModuleResolution(filename);
      }
      if (fs.existsSync(filename)) {
        return filename;
      }
      console.log(`${filename.replace(process.cwd(), "")} not exist.`);
    }
    // from node_modules
    // console.log(target);
  }

  getFilenameLikeModuleResolution(filename: string) {
    const extFiles = FileESManager.SUPPORTED_EXT.map((e) => `${filename}${e}`);
    const childFiles = FileESManager.SUPPORTED_EXT.map((e) =>
      path.resolve(filename, `./index${e}`)
    );
    const composeFiles = [...extFiles, ...childFiles];
    let i = 0;
    while (i < composeFiles.length) {
      const name = composeFiles[i++];
      if (fs.existsSync(name)) {
        return name;
      }
    }
    console.log(`${filename.replace(process.cwd(), "")} not exist.`);
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

  async walkTreeNext(filename: string, source: string, exportItem: ExportItem) {
    const sourceFilename = this.getFilenameFromAnother(filename, source);
    if (sourceFilename) {
      await this.walkTree(sourceFilename, exportItem);
    }
  }

  updateTerminalImportList(file: FileES) {
    if (this.terminalImportList.includes(file)) {
      return;
    }
    this.terminalImportList.push(file);
  }

  async walkRoot(filename: string): Promise<void> {
    const childFileES = await this.createFileES(filename);

    if (!childFileES.ast) {
      return this.updateTerminalImportList(childFileES);
    }

    const list = childFileES.getFlatImportOrExportList(childFileES.importList);

    for (let i = 0; i < list.length; i++) {
      const { source, type } = list[i];
      if (!type || type === AST_NODE_TYPES.ImportNamespaceSpecifier) {
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
        await this.walkTreeNext(filename, source!, list[i] as ExportItem);
      }
    }
  }

  async walkTree(
    filename: string,
    exportItem: { name: string; type: AST_NODE_TYPES }
  ): Promise<void> {
    const childFileES = await this.createFileES(filename);
    if (!childFileES.ast) {
      return this.updateTerminalImportList(childFileES);
    }
    let childExportItem: ExportFlatDataInterface | undefined;
    if (exportItem.type === AST_NODE_TYPES.ImportDefaultSpecifier) {
      childExportItem = childFileES.getDefaultExport();
      if (!childExportItem) {
        throw new Error(`${childFileES.filename} has not export default.`);
      }
    } else {
      childExportItem = childFileES.getExportByName(exportItem.name);
    }
    if (childExportItem?.source) {
      return await this.walkTreeNext(
        filename,
        childExportItem.source,
        exportItem
      );
    }
    if (childExportItem?.name) {
      const importItem = childFileES.getImportByName(childExportItem.name);
      if (importItem) {
        /** 透传export */
        return await this.walkTreeNext(
          filename,
          importItem.source!,
          exportItem
        );
      }
      this.updateTerminalImportList(childFileES);
      return await this.walkRoot(childFileES.filename);
    }
    const implicitExportList = childFileES.getImplicitExportList();
    if (implicitExportList.length > 0) {
      for (let i = 0; i < implicitExportList.length; i++) {
        await this.walkTreeNext(
          filename,
          implicitExportList[i].source!,
          exportItem
        );
      }
    }
  }
}

export default FileESManager;
