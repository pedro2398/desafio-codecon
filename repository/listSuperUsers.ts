import prismaClient from "../config";

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
