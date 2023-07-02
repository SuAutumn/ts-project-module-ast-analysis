import FileES, { ExportDataInterface, ImportDataInterface } from "./file-es";
import * as path from "path";

interface FileESManagerInterface {
  filename: string;
  fileES?: FileES;
  terminalImportList: FileES[];
  parse(): Promise<void>;
  walkTree(filename: string, name: string, source: string): Promise<boolean | undefined>;
}
class FileESManager implements FileESManagerInterface {
  filename: string;
  fileES?: FileES;
  terminalImportList: FileES[] = []

  constructor(filename: string) {
    this.filename = filename;
  }

  async parse() {
    this.fileES = new FileES(this.filename);
    await this.fileES.parse();
  }

  async getTerminalImportList() {
    this.fileES?.importList.forEach(importItem => {
      const { nameList, source } = importItem
      nameList.forEach(async ({ name, alias }) => {
        await this.walkTree(this.filename, name, source)
      })
    })
  }

  async walkTree(
    filename: string,
    name: string,
    source: string
  ): Promise<boolean | undefined> {
    const childFileES = new FileES(
      path.resolve(path.dirname(filename), source)
    );
    await childFileES.parse();
    const exportItem = this.findExport(name, childFileES);
    if (!exportItem) {
      const implicitExportItem = this.findImplicitExport(name, childFileES);
      if (implicitExportItem) {
        let index = 0;
        while (implicitExportItem.length > index) {
          const isFound = await this.walkTree(
            childFileES.filename,
            name,
            implicitExportItem[index].source!
          );
          if (isFound) break;
          index++;
        }
      }
    } else {
      if (exportItem.source === undefined) {
        const importItem = this.findImportByExport(name, childFileES);
        if (importItem) {
          await this.walkTree(childFileES.filename, name, importItem.source);
        } else {
          this.terminalImportList.push(childFileES);
          return true;
        }
      } else {
        await this.walkTree(childFileES.filename, name, exportItem.source);
      }
    }
  }

  findImportByExport(name: string, fileES: FileES) {
    return fileES.importList.find((importItem) => {
      return importItem.nameList.some(
        (imName) => imName.alias === name || imName.name === name
      );
    });
  }

  findExport(name: string, fileES: FileES) {
    return fileES.exportList.find((exportItem) => {
      return exportItem.nameList?.some(
        (exName) => name === exName.alias || name === exName.name
      );
    });
  }

  findImplicitExport(name: string, fileES: FileES) {
    return fileES.exportList.filter(
      (exportItem) => exportItem.source && exportItem.nameList === undefined
    );
  }
}

export default FileESManager;
