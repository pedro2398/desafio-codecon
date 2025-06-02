import { saveUser as saveUserFn } from "./saveUser";
import { listSuperUsers as listSuperUsersFn } from "./listSuperUsers";
import { connectToMongodb } from "../config";

export const saveUser = async (
  ...args: Parameters<ReturnType<typeof saveUserFn>>
) => {
  const conn = await connectToMongodb();
  return saveUserFn(conn)(...args);
};

export const listSuperUsers = async (
  ...args: Parameters<ReturnType<typeof listSuperUsersFn>>
) => {
  const conn = await connectToMongodb();
  return listSuperUsersFn(conn)(...args);
};
