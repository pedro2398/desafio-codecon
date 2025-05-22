import { User } from "../utils";
import { saveUser as saveUserRepository } from '../repository'

export const saveUser = async (user: User) => {
  try {
    return await saveUserRepository(user);
  } catch (err) {
    console.error('Error saving user: ', err);
  }
};
