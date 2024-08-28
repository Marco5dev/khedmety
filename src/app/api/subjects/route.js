import bcrypt from 'bcryptjs';
import Subjects from "@/model/Subjects";
import User from "@/model/User";
import { subjectsDBConnect } from "@/utils/mongodb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {db} from "@/Data/.config/database.versedb";

export async function GET(request) {
    await subjectsDBConnect();
    const session = await getServerSession(request)
    // const session = await getServerSession(); // Retrieve the session

    if (!session?.user?.email) {
        return NextResponse.json(
            { message: "User not authenticated" },
            { status: 401 }
        );
    }

    const user = session.user?.email;
    const userData = await User.findOne({ email: user });

    if (!userData) {
        return NextResponse.json(
            { message: "User not found" },
            { status: 404 }
        );
    }

    try {
        const subjects = await db.load("subjects");

            return NextResponse.json(
                { subjects, user: { name: userData.name, email: userData.email } },
                { status: 200 }
            );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function POST(request) {
  await subjectsDBConnect();
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }

  const { title, description } = await request.json();
  const user = session.user.email;
  const userData = await User.findOne({ email: user });

  if (!userData) {
    return NextResponse.json(
      { message: "User not found" },
      { status: 404 }
    );
  }

  try {
    const newUser = new Subjects({ title, description, userid: userData._id });
    await newUser.save();

    return NextResponse.json(
      { message: "New Subject posted!" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
