import mongoose from "mongoose";
const MONGO_URI_USERS = process.env.MONGO_URI_USERS;
const MONGO_URI_SUBJECTS = process.env.MONGO_URI_SUBJECTS;

if (!MONGO_URI_USERS) {
  throw new Error("Please define the MONGO_URI_USERS environment variable inside .env");
}
if (!MONGO_URI_SUBJECTS) {
  throw new Error("Please define the MONGO_URI_SUBJECTS environment variable inside .env");
}

export async function usersDBConnect() {
  if(mongoose.connection.readyState !== 1) {
    try {
      await mongoose.connect(MONGO_URI_USERS)
      console.log("Users DB is connected!")
    } catch (error) {
      console.log(error);
      throw error;
    }
  } else {
    console.log("Users DB is already connected!");
  }
}
export async function subjectsDBConnect() {
  if(mongoose.connection.readyState !== 1) {
    try {
      await mongoose.connect(MONGO_URI_SUBJECTS)
      console.log("Subjects DB is connected!")
    } catch (error) {
      console.log(error);
      throw error;
    }
  } else {
    console.log("Subjects DB is already connected!");
  }
}