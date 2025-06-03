import mongoose from "mongoose";

const connectionString = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/${process.env.MONGO_INITDB_DATABASE}?authSource=admin`;

let conn: mongoose.Connection | null = null;

export const connectToMongodb = async (): Promise<mongoose.Connection> => {
  if (!conn) {
    conn = mongoose.createConnection(connectionString, {
      retryWrites: false,
      tls: true,
      retryReads: true,
      maxPoolSize: 15,
      connectTimeoutMS: 10000,
    });

    try {
      await conn.asPromise();
      console.log("Connected to MongoDB");

      return conn;
    } catch (err) {
      conn = null;

      console.error("Error connecting to MongoDB:", err);
      throw new Error("Failed to connect to MongoDB");
    }
  }

  return conn;
};
