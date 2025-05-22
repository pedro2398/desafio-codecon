import prismaClient from "../config";
import { User } from "../utils";

export const saveUser = async (user: User) => {
  return prismaClient.user.create({
    data: {
      ...user,
      id: user.id as string,
    },
  });
};
