import FileES, { ExportFlatDataInterface } from "./file-es";
import * as path from "path";
import readFile from "./utils/read-file";
import * as fs from "fs";
import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree";
import * as process from "process";
import fileEsCache from "./file-es-cache";
import { TreeData } from "./dto";

type ExportItem = { type: AST_NODE_TYPES; name: string };

type FileESManagerOptions = { alias?: Record<string, string> };

interface FileESManagerInterface {
  filename: string;
  options: FileESManagerOptions;
  /** 通过分析导入导出依赖，获得模块的最终文件的依赖 */
  flatImportList: FileES[];
  treeImportList: TreeData<FileES>[];
  /** 更新 flatImportList & treeImportList 数据 */
  updateImportList(item: FileES, container: TreeData<FileES>[]): void;
  /** 遍历 file export list 元素，查找是否存在name一致的导出 */
  walkTree(
    filename: string,
    exportItem: ExportItem,
    container: TreeData<FileES>[]
  ): Promise<void>;
  /** 检查新的filename是否存在，存在继续walkTree */
  walkTreeNext(
    filename: string,
    source: string,
    exportItem: ExportItem,
    container: TreeData<FileES>[]
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
    await this.walkRoot(this.filename, this.treeImportList);
  }

  updateImportList(item: FileES, container: TreeData<FileES>[]) {
    this.updateFlatImportList(item);
    const treeItem: Required<TreeData<FileES>> = { data: item, children: [] };
    container.push(treeItem);
    return treeItem.children;
  }

  updateFlatImportList(file: FileES) {
    if (this.flatImportList.includes(file)) {
      return;
    }
    this.flatImportList.push(file);
  }

  isUnsupportedAstFile(file: FileES) {
    return !file.ast;
  }
  /** 不可被typescript/estree ast编译的文件，直接存储，e.g: svg png less */
  handleUnsupportedAstFile(file: FileES, container: TreeData<FileES>[]) {
    this.updateImportList(file, container);
  }
  async walkTreeNext(
    filename: string,
    source: string,
    exportItem: ExportItem,
    container: TreeData<FileES>[]
  ) {
    const sourceFilename = this.resolveImportFilename(filename, source);
    if (sourceFilename) {
      await this.walkTree(sourceFilename, exportItem, container);
    }
  }

  async walkRoot(
    filename: string,
    container: TreeData<FileES>[]
  ): Promise<void> {
    const childFileES = await this.createFileES(filename);

    if (this.isUnsupportedAstFile(childFileES)) {
      return this.handleUnsupportedAstFile(childFileES, container);
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
          if (nextFileES) this.updateImportList(nextFileES, container);
        }
      } else {
        await this.walkTreeNext(
          filename,
          source!,
          list[i] as ExportItem,
          container
        );
      }
    }
  }

  async walkTree(
    filename: string,
    exportItem: { name: string; type: AST_NODE_TYPES },
    container: TreeData<FileES>[]
  ): Promise<void> {
    const childFileES = await this.createFileES(filename);
    if (this.isUnsupportedAstFile(childFileES)) {
      return this.handleUnsupportedAstFile(childFileES, container);
    }
    /** 在childFileES中查找适合exportItem导出项 */
    let childExportItem: ExportFlatDataInterface | undefined;
    if (exportItem.type === AST_NODE_TYPES.ImportDefaultSpecifier) {
      /** 查找默认导出 */
      childExportItem = childFileES.getDefaultExport();
      if (!childExportItem) {
        throw new Error(`${childFileES.filename} has not export default.`);
      }
    } else {
      childExportItem = childFileES.getExportByName(exportItem.name);
    }
    /** 在export中找到导出 */
    if (childExportItem?.source) {
      return await this.walkTreeNext(
        filename,
        childExportItem.source,
        {
          ...childExportItem,
          type:
            childExportItem.name === "default"
              ? AST_NODE_TYPES.ImportDefaultSpecifier
              : AST_NODE_TYPES.ImportNamespaceSpecifier,
        } as ExportItem,
        container
      );
    }
    /** 在import中找到导出 */
    if (childExportItem?.name) {
      const importItem = childFileES.getImportByName(childExportItem.name);
      if (importItem) {
        /** 透传export */
        return await this.walkTreeNext(
          filename,
          importItem.source!,
          importItem as ExportItem,
          container
        );
      }
      /** 未找到importItem，则认为此childFileES为依赖项 */
      const newContainer = this.updateImportList(childFileES, container);
      return await this.walkRoot(childFileES.filename, newContainer);
    }
    /** 在import * from "xx"中查找导出 */
    const implicitExportList = childFileES.getImplicitExportList();
    if (implicitExportList.length > 0) {
      for (let i = 0; i < implicitExportList.length; i++) {
        await this.walkTreeNext(
          filename,
          implicitExportList[i].source!,
          exportItem,
          container
        );
      }
    }
  }
}

export default FileESManager;
