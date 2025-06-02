import { Connection } from "mongoose";
import { getUserModel } from "../entities";
import { User } from "../utils";

interface SaveUsersParams {
  user: User;
}

export const saveUser =
  (conn: Connection) =>
  async ({ user }: SaveUsersParams) => {
    const userModel = getUserModel(conn);

    return userModel.create(user);
  };
