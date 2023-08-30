import path from "path";
import * as process from "process";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import handleDep, { HandleDepParams } from "./handle-dep-cmd";
import handleReactRouterCmd from "./handle-react-router-cmd";

yargs(hideBin(process.argv))
  .scriptName("esman")
  .usage("$0 <cmd> [args]")
  .command<HandleDepParams>(
    "dep <filename> [--alias]",
    "收集文件中依赖的文件",
    (argv) => {
      argv.positional("filename", {
        type: "string",
        describe: "收集该文件中存在的依赖",
        demandOption: true,
      });
      argv.options({
        alias: {
          type: "string",
          describe: "路径中`@`设置的别名",
          default: path.resolve(process.cwd(), "./src"),
        },
      });
    },
    function (argv) {
      handleDep(argv);
    }
  )
  .command<HandleDepParams>(
    "react-router <filename> [--alias]",
    "收集在React项目中路由配置中文件依赖",
    (argv) => {
      argv.positional("filename", {
        type: "string",
        describe: "收集该文件中存在的依赖",
        demandOption: true,
      });
      argv.options({
        alias: {
          type: "string",
          describe: "路径中`@`设置的别名",
          default: path.resolve(process.cwd(), "./src"),
        },
      });
    },
    function (argv) {
      handleReactRouterCmd(argv);
    }
  )
  .demandCommand(2)
  .parse();
