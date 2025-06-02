import { Connection, Model, Schema } from "mongoose";
import { User } from "../utils";

export interface UserDocument extends Omit<User, "id">, Document {
  id: string;
}

export const getUserModel = (conn: Connection): Model<UserDocument> => {
  const { User } = conn.models;
  if (User) return User;

  const userSchema = new Schema(
    {
      id: {
        type: String,
        required: true,
        unique: true,
      },
      name: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
        required: true,
      },
      score: {
        type: Number,
        required: true,
      },
      active: {
        type: Boolean,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      team: [
        {
          name: String,
          leader: Boolean,
          projects: [
            {
              name: String,
              completed: Boolean,
            },
          ],
        },
      ],
      logs: [{ date: String, action: String }],
    },
    {
      versionKey: false,
    }
  );

  return conn.model<UserDocument>("User", userSchema);
};
