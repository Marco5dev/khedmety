import User from "@/model/User";
import dbConnect from "@/utils/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  await dbConnect();

  const { username, name, email, password } = await request.json();

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json(
        { message: "User Already Registered!" },
        { status: 401 }
      );
    }

    const newUser = new User({ username, name, email, password });
    await newUser.save();
    return NextResponse.json(
      { message: "Registration success!" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
