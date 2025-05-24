import prismaClient from "../config";
import { User } from "../utils";

export const getSuperUsers = () => {
  return prismaClient.user.findMany({
    where: {
      score: {
        gte: 900,
      },
      active: true,
    },
  });
};
