import { FileESManager } from "../index";

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
  console.log(esManager.flatImportList.map((item) => item.filename));
};
export default handleDep;
