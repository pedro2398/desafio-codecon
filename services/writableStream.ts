import { Writable } from "stream";
import { saveUser } from "../repository";

export const saveInDatabase = new Writable({
  write: function (chunk, _encoding, cb) {
    saveUser(chunk);
    cb();
  },
});
