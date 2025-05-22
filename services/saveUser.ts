import { User } from "../utils";
import { v4 as uuidv4 } from 'uuid';
import { saveUser as saveUserRepository } from '../repository'

export const saveUser = async (user: User) => {
  return await saveUserRepository({
     ...user,
     id: uuidv4()
   });
};
