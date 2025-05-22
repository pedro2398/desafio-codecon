import prismaClient from "../config";
import { User } from "../utils";

export const saveUser = (data: User) => {
  return prismaClient.user.create({
    data,
  });
};
