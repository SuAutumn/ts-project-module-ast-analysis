import path from "path";
import fs from "fs";
import process from "process";
import { FileESManagerOptions, FileESPathHelperConstructorParams } from "./dto";

const SUPPORTED_EXT = [
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

class FileESPathHelper {
  /** 路径别名 */
  readonly alias: NonNullable<FileESPathHelperConstructorParams["alias"]>;
  /** 支持的文件类型 */
  readonly supportedExt: NonNullable<
    FileESPathHelperConstructorParams["supportedExt"]
  >;
  constructor({
    alias = {},
    supportedExt = SUPPORTED_EXT,
  }: FileESPathHelperConstructorParams = {}) {
    this.alias = alias;
    this.supportedExt = supportedExt;
  }
  /**
   * 替换为真实的路径地址
   * e.g:
   * alias = {'@': '/a/b/c'}
   * '@/components/index.tsx' => '/a/b/c/components/index.tsx'
   */
  replaceAliasPath(source: string) {
    const aliasPath = this.getAliasPath(source);
    if (aliasPath) {
      return source.replace(aliasPath, this.alias[aliasPath]);
    }
    return source;
  }

  private getAliasPath(source: string): string | undefined {
    const aliasList = Object.keys(this.alias);
    for (const item of aliasList) {
      /** 以目录结尾 */
      const startPath = item.slice(-1) === "/" ? `${item}` : `${item}/`;
      if (source.startsWith(startPath)) {
        return item;
      }
    }
  }

  /**
   * 从当前目录查找目标文件的路径
   */
  resolveImportFilename(source: string, target: string) {
    /** 仅仅处理非三方包文件 */
    if (this.getAliasPath(target) || target.startsWith(".")) {
      const dirname = path.dirname(source);
      const filename = path.resolve(dirname, this.replaceAliasPath(target));
      if (path.extname(filename) === "") {
        return this.getSupportedExtFile(filename);
      }
      if (fs.existsSync(filename)) {
        return filename;
      }
      console.log(`${filename.replace(process.cwd(), "")} not exist.`);
    }
  }

  private getSupportedExtFile(filename: string) {
    const extFiles = this.supportedExt.map((ext) => `${filename}${ext}`);
    const childFiles = this.supportedExt.map((ext) =>
      path.resolve(filename, `./index${ext}`)
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
}

export default FileESPathHelper;
