import bcrypt from 'bcryptjs';
import User from "@/model/User";
import {usersDBConnect} from "@/utils/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  await usersDBConnect();

  const { username, name, email, password } = await request.json();

  try {
    const existing_username = await User.findOne({ username });
    if (existing_username) {
      return NextResponse.json(
        { errorUsername: "username Already Registered!" },
        { status: 409 }
      );
    }
    const existing_email = await User.findOne({ email });
    if (existing_email) {
      return NextResponse.json(
        { errorEmail: "email Already Registered!" },
        { status: 409 }
      );
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, name, email, password: hashedPassword });
    await newUser.save();
    return NextResponse.json(
      { message: "Registration success!" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
