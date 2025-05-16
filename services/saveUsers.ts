import { writeFileSync } from "fs";
import { User } from "../utils";

export const SaveUsers = (users: User[]) => {
  writeFileSync("./users.json", JSON.stringify(users));
};
