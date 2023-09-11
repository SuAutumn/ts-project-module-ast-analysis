import path from "path";
import { PathHelper } from "../src/index";
import ReactApisConfigParser from "../src/react-apis-config-parser";
describe("测试api配置文件", () => {
  it("解析api配置数据", async () => {
    const filename = path.resolve("./test-project/api/index.ts");
    const pathHelper = new PathHelper({
      alias: {
        "@": path.resolve("./test-project"),
      },
    });
    const parser = new ReactApisConfigParser(filename, pathHelper);
    const routeConfig = await parser.getApisValue();
    expect(routeConfig instanceof Object).toBe(true);
  });
});
