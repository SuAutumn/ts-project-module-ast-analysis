import * as fs from "node:fs/promises";

type AbortPromise<T> = Promise<T> & { abort: AbortController["abort"] };

const readFile = (filename: string) => {
  const abort = new AbortController();
  const file = fs.readFile(filename, {
    encoding: "utf-8",
    flag: "r",
    signal: abort.signal,
  });
  const p = file as AbortPromise<string>;
  p.abort = abort.abort.bind(abort);
  return p;
};

export default readFile;
