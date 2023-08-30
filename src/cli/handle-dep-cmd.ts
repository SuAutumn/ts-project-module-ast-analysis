import { FileESManager, PathHelper } from "../index";
import { TreeData } from "../dto";
import { FileES } from "@";

export interface HandleDepParams {
  filename: string;
  alias: string;
}

const handleDep = ({ filename, ...options }: HandleDepParams) => {
  const esManager = new FileESManager(
    filename,
    new PathHelper({ alias: { "@": options.alias } })
  );
  esManager.getTerminalImportList();
  console.log(
    JSON.stringify(logTreeData(esManager.treeImportList), undefined, "  ")
  );
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
