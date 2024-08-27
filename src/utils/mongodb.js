import mongoose from "mongoose";
const MONGO_URI_USERS = process.env.MONGO_URI_USERS;

if (!MONGO_URI_USERS) {
  throw new Error("Please define the MONGO_URI_USERS environment variable inside .env");
}

export async function usersDBConnect() {
  if(mongoose.connection.readyState !== 1) {
    try {
      await mongoose.connect(MONGO_URI_USERS)
      console.log("DB is connected!")
    } catch (error) {
      console.log(error);
      throw error;
    }
  } else {
    console.log("DB is already connected!");
  }
}