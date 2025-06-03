import { listSuperUsers as listSuperUsersRepository } from "../repository";

export const listSuperUsers = async () => {
  try {
    return await listSuperUsersRepository();
  } catch (err) {
    console.error("Error listing super users: ", err);
  }
};
