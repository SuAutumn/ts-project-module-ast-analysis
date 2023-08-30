import FileESManager from "../src/file-es-manager";
import * as path from "path";
import { PathHelper } from "../lib";

describe("File es manager module tester", () => {
  const filename = "test-project/index.tsx";
  const pathHelper = new PathHelper({
    alias: { "@": "./" },
  });

  it("Test walkTree method", () => {
    const absFilename = path.resolve(filename);
    const m = new FileESManager(filename, pathHelper);
    m.getTerminalImportList();
    console.log(
      m.flatImportList.map((f) => f.filename.replace(process.cwd(), ""))
    );
  });
});
