import { getSuperUsers } from "../repository";

export const listSuperUsers = async () => {
  try {
      return await getSuperUsers();
  } catch (err) {
    console.error("Error listing super users: ", err);
  }
};
