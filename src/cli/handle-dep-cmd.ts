import { FileESManager } from "../index";
import { TreeData } from "../dto";
import { FileES } from "@";

export interface HandleDepProps {
  filename: string;
  alias: string;
}

const handleDep = async ({ filename, ...options }: HandleDepProps) => {
  const esManager = new FileESManager(filename, {
    alias: {
      "@": options.alias,
    },
  });
  await esManager.getTerminalImportList();
  // console.log(
  //   JSON.stringify(logTreeData(esManager.treeImportList), undefined, "  ")
  // );
  console.log(
    esManager.file?.getDefaultExport(),
    esManager.file?.getVariableList(),
    esManager.file?.ast
  );
  // matchI18nKeys(esManager.flatImportList);
};

const matchI18nKeys = (files: FileES[]) => {
  files.forEach((item) => {
    const i18nKeyMatcher = /(?<!\w)t\(("[\w- ]+")\)/g;
    console.log(item.filename);
    if (item.fileContent) {
      let match: RegExpExecArray | null;
      while ((match = i18nKeyMatcher.exec(item.fileContent)) !== null) {
        console.log(match[1], match[0]);
      }
    }
  });
};

const logTreeData = (data: TreeData<FileES>[]) => {
  const container: TreeData<string>[] = [];
  data.forEach((item) => {
    const logItem: TreeData<string> = { data: item.data.filename };
    container.push(logItem);
    if (item.children && item.children.length > 0) {
      logItem.children = logTreeData(item.children);
    }
  });
  return container;
};
export default handleDep;
