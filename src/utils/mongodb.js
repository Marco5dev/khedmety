import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable inside .env");
}

export default async function dbConnect() {
  if(mongoose.connection.readyState !== 1) {
    try {
      await mongoose.connect(MONGO_URI)
      console.log("DB is connected!")
    } catch (error) {
      console.log(error);
      throw error;
    }
  } else {
    console.log("DB is already connected!");
  }
}