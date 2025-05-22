import { User } from "../utils";
import { saveUser as saveUserRepository } from '../repository'

export const saveUser = (user: User) => {
  try {
    return saveUserRepository(user);
  } catch (err) {
    console.error('Error saving user: ', err);
  }
};
