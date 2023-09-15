import path from "path";
import { HandleDepParams } from "./handle-dep-cmd";
import {
  ReactRouterConfigParser,
  PathHelper,
  FileES,
  FileESManager,
} from "../index";
import { Config } from "../dto";
import process from "process";

interface I18nKeysTracker {
  path?: string;
  componentId?: string;
  filename: string;
  keys: {
    [filename: string]: string[];
  };
}

const matchI18nKeys = (files: FileES[]) => {
  let recorder: Record<string, string[]> = {};
  files.forEach((item) => {
    const i18nKeyMatcher = /(?<!\w)t\("([\w- ]+)"\)/g;
    if (item.fileContent) {
      let match: RegExpExecArray | null;
      let filename = item.filename.replace(process.cwd(), "");
      while ((match = i18nKeyMatcher.exec(item.fileContent)) !== null) {
        if (!recorder[filename]) {
          recorder[filename] = [];
        }
        if (!recorder[filename].includes(match[1])) {
          recorder[filename].push(match[1]);
        }
      }
    }
  });
  return recorder;
};
const handleReactRouterCmd = (params: HandleDepParams) => {
  const parser = new ReactRouterConfigParser(
    path.resolve(params.filename),
    new PathHelper({
      alias: { "@": path.resolve(params.alias) },
    })
  );
  // console.log(JSON.stringify(parser.getRouteConfig(), undefined, "  "));
  const recorder: I18nKeysTracker[] = [];
  const log = [];
  parser.on(
    "route",
    ({ manager, route }: { manager: FileESManager; route: Config }) => {
      manager.getTerminalImportList();
      const keys = matchI18nKeys([manager.file, ...manager.flatImportList]);

      recorder.push({
        path: route.path?.value as string,
        componentId: route.componentId?.value as string,
        filename: manager.filename.replace(process.cwd(), ""),
        keys,
      });
    }
  );
  process.on("exit", () => {
    console.log(JSON.stringify(recorder, undefined, "  "));
  });
  parser.parse();
};

export default handleReactRouterCmd;
