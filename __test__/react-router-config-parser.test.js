import path from "path";
import { PathHelper } from "../src/index";
import ReactRouterConfigParser from "../src/react-router-config-parser";
describe("测试React Router配置文件", () => {
  it("解析路由配置数据", async () => {
    const filename = path.resolve("./test-project/router/index.tsx");
    const pathHelper = new PathHelper({
      alias: {
        "@": path.resolve("./test-project"),
      },
    });
    const parser = new ReactRouterConfigParser(filename, pathHelper);
    const config = parser.getRouteConfig();
    expect(config instanceof Array).toBe(true);
    // console.log(JSON.stringify(config, undefined, "  "));
    parser.on("route", ({ manager, route }) => {
      console.log(route);
      console.log(manager);
    });
    parser.parse();
  });
});
