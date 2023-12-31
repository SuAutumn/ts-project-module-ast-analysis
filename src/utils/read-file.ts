import * as fsPromise from "node:fs/promises";
import * as fs from "node:fs";

type AbortPromise<T> = Promise<T> & { abort: AbortController["abort"] };

const readFile = (filename: string) => {
  const abort = new AbortController();
  const file = fsPromise.readFile(filename, {
    encoding: "utf-8",
    flag: "r",
    signal: abort.signal,
  });
  const p = file as AbortPromise<string>;
  p.abort = abort.abort.bind(abort);
  return p;
};

export const readFileSync = (filename: string) => {
  return fs.readFileSync(filename, {
    encoding: "utf-8",
    flag: "r",
  });
};

export default readFile;
