import FileES, { ExportFlatDataInterface } from "./file-es";
import * as path from "path";
import readFile from "./utils/read-file";
import * as fs from "fs";
import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree";
import * as process from "process";
import fileEsCache from "./file-es-cache";

type ExportItem = { type: AST_NODE_TYPES; name: string };

type FileESManagerOptions = { alias?: Record<string, string> };

interface TreeData<T> {
  data: T;
  children?: TreeData<T>[];
}

interface FileESManagerInterface {
  filename: string;
  options: FileESManagerOptions;
  /** 通过分析导入导出依赖，获得模块的最终文件的依赖 */
  flatImportList: FileES[];
  treeImportList: TreeData<FileES>[];
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
  flatImportList: FileES[] = [];
  treeImportList: TreeData<FileES>[] = [];
  options: FileESManagerOptions;
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
    const key = this.startWithAlias(source);
    if (key) {
      return source.replace(key, this.options.alias![key]);
    }
    return source;
  }

  startWithAlias(source: string): false | string {
    if (this.options.alias) {
      const keys = Object.keys(this.options.alias);
      for (const k of keys) {
        const lastChar = k.slice(-1) === "/" ? "" : "/";
        if (source.startsWith(`${k}${lastChar}`)) {
          return k;
        }
      }
    }
    return false;
  }

  /**
   * 从当前目录查找目标文件的路径
   */
  resolveImportFilename(source: string, target: string) {
    if (this.startWithAlias(target) || target.startsWith(".")) {
      const dirname = path.dirname(source);
      const filename = path.resolve(dirname, this.aliasPathHelper(target));
      if (path.extname(filename) === "") {
        return this.getFilenameLikeModuleResolution(filename);
      }
      if (fs.existsSync(filename)) {
        return filename;
      }
      console.log(`${filename.replace(process.cwd(), "")} not exist.`);
    }
    // from node_modules
    //   console.log(target);
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
    if (fileEsCache.has(filename)) {
      return fileEsCache.get(filename)!;
    }
    let fileContent: string | undefined;
    if (FileES.isSupportedFile(filename)) {
      fileContent = await readFile(filename);
    }
    const fileES = new FileES({ fileContent, filename });
    return fileEsCache.set(filename, fileES);
  }

  async getTerminalImportList() {
    await this.walkRoot(this.filename);
  }

  async walkTreeNext(filename: string, source: string, exportItem: ExportItem) {
    const sourceFilename = this.resolveImportFilename(filename, source);
    if (sourceFilename) {
      await this.walkTree(sourceFilename, exportItem);
    }
  }

  updateFlatImportList(file: FileES) {
    if (this.flatImportList.includes(file)) {
      return;
    }
    this.flatImportList.push(file);
  }

  async walkRoot(filename: string): Promise<void> {
    const childFileES = await this.createFileES(filename);

    /** 不可被typescript/estree ast编译的文件，直接存储，e.g: svg png less */
    if (!childFileES.ast) {
      return this.updateFlatImportList(childFileES);
    }

    const list = childFileES.getFlatImportOrExportList(childFileES.importList);

    for (let i = 0; i < list.length; i++) {
      const { source, type } = list[i];
      if (!type || type === AST_NODE_TYPES.ImportNamespaceSpecifier) {
        /**
         * import "./a" or import * as a from "./a"
         * 直接当作有副作用的依赖记录
         */
        const importFilename = this.resolveImportFilename(filename, source!);
        if (importFilename) {
          const nextFileES = await this.createFileES(importFilename);
          if (nextFileES) this.updateFlatImportList(nextFileES);
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
      /** 不能被ast的，当作资源文件直接依赖记录 */
      return this.updateFlatImportList(childFileES);
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
      return await this.walkTreeNext(filename, childExportItem.source, {
        ...childExportItem,
        type:
          childExportItem.name === "default"
            ? AST_NODE_TYPES.ImportDefaultSpecifier
            : AST_NODE_TYPES.ImportNamespaceSpecifier,
      } as ExportItem);
    }
    if (childExportItem?.name) {
      const importItem = childFileES.getImportByName(childExportItem.name);
      if (importItem) {
        /** 透传export */
        return await this.walkTreeNext(
          filename,
          importItem.source!,
          importItem as ExportItem
        );
      }
      this.updateFlatImportList(childFileES);
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
