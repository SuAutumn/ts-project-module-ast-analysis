import path from "path";
import { FileESManager } from "../src/index";
import ReactRouterConfigParser from "../src/react-router-config-parser";
describe("测试React Router配置文件", () => {
  it("解析配置数据", async () => {
    process.chdir("../../work/we-power");
    const filename = path.resolve("./src/router/index.tsx");
    const manger = new FileESManager(filename, {
      alias: {
        "@": path.resolve("./src"),
      },
    });
    const parser = new ReactRouterConfigParser(manger);
    await parser.manager.getTerminalImportList();
    parser.runRoutesFile();
  });
});
