import prismaClient from "../config";

export const getSuperUsers = () => {
  return prismaClient.user.findMany({
    where: {
      score: {
        gt: 900,
      },
      active: true,
    },
  });
};
