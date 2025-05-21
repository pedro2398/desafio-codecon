import prismaClient from "../config";
import { User } from "../utils";

export const saveUser = async (data: User) => {
  await prismaClient.user.create({
    data,
  });
};
