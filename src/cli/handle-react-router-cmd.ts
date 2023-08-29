import path from "path";
import { HandleDepParams } from "./handle-dep-cmd";
import { FileESManager, ReactRouterConfigParser } from "../index";
import FileESPathHelper from "../file-es-path-helper";

const handleReactRouterCmd = (params: HandleDepParams) => {
  console.log(params);
  const pathHelper = new FileESPathHelper({
    alias: { "@": path.resolve(params.alias) },
    supportedExt: FileESManager.SUPPORTED_EXT,
  });
  const parser = new ReactRouterConfigParser(
    path.resolve(params.filename),
    pathHelper
  );
  parser.runRoutesFile();
};

export default handleReactRouterCmd;
