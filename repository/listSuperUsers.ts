import { Connection } from "mongoose";
import { getUserModel } from "../entities";

export const listSuperUsers = (conn: Connection) => async () => {
  const userModel = getUserModel(conn);

  return userModel
    .find({
      active: true,
      score: { $gt: 900 },
    })
    .lean();
};
