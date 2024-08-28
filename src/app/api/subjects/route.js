import bcrypt from 'bcryptjs';
import Subjects from "@/model/Subjects";
import { subjectsDBConnect } from "@/utils/mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
    await subjectsDBConnect();
    const subjects = await Subjects.find();

    try {
        if(!subjects){
            return NextResponse.json(
                { message: "Data dosn't exists" },
                { status: 404 }
              );
        } else {
            return NextResponse.json(
                { subjects },
                { status: 200 }
              );
        }
    } catch (error) {
        console.log(error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
    }

}

export async function POST(request) {
  await subjectsDBConnect();

  const { title, description, userid, image } = await request.json();

  try {
    const newUser = new Subjects({ title, description, userid, image });
    await newUser.save();

    return NextResponse.json(
      { message: "New Subjects posted!" },
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
