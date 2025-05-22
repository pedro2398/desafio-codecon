import { User } from "../utils";
import { saveUser as saveUserRepository } from '../repository'

export const saveUser = async (user: User) => {
  return await saveUserRepository(user);
};
