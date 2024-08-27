import bcrypt from 'bcryptjs';
import User from "@/model/User";
import { usersDBConnect } from "@/utils/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  await usersDBConnect();

  const { email, password } = await request.json();

  try {
    // Find user by username
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // If everything is correct, respond with success message
    return NextResponse.json(
      { message: "Login successful!" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
