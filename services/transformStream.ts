import { Transform } from "stream";

export const convertToString = new Transform({
  transform(chunk, _encoding, cb) {
    const userString = chunk.toString("utf8");

    this.push(JSON.parse(userString));
    cb();
  },
});
