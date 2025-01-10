import { DBConnect } from "@/utils/mongodb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Subjects from "@/model/Subjects";
import User from "@/model/User";

export async function GET() {
  try {
    await DBConnect();
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    // Get all subjects first
    const subjects = await Subjects.find().lean();

    if (!subjects || subjects.length === 0) {
      console.log("No subjects found in database");
      return NextResponse.json({ subjects: [] }, { status: 200 });
    }

    // Get user details for each subject
    const subjectsWithUsers = await Promise.all(
      subjects.map(async (subject) => {
        const user = await User.findById(subject.userid).lean();
        return {
          ...subject,
          user: user
            ? {
                name: user.name,
                email: user.email,
              }
            : null,
        };
      })
    );
    return NextResponse.json({ subjects: subjectsWithUsers }, { status: 200 });
  } catch (error) {
    console.error("Subjects API Error:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await DBConnect();
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    const { title, description } = await request.json();
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const newSubject = await Subjects.create({
      title,
      description,
      userid: user._id,
    });

    return NextResponse.json(
      { message: "Subject created successfully", subject: newSubject },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create Subject Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
