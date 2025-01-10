import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable inside .env");
}

export async function DBConnect() {
  if (mongoose.connection.readyState !== 1) {
    try {
      await mongoose.connect(MONGO_URI);
      console.log("MongoDB connected successfully!");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      throw error;
    }
  } else {
    console.log("MongoDB is already connected!");
  }
}
