import { DBConnect } from "@/utils/mongodb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Subjects from "@/model/Subjects";
import User from "@/model/User";

export async function GET(request, { params }) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();

  try {
    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    await DBConnect();
    const subject = await Subjects.findById(id);
    
    if (!subject) {
      return NextResponse.json(
        { message: "Subject doesn't exist" },
        { status: 404 }
      );
    }

    const user = await User.findById(subject.userid);
    
    return NextResponse.json({ subject, user }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();

  try {
    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    console.log("Delete request received for subject ID:", id);

    await DBConnect();
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    const deletedSubject = await Subjects.findByIdAndDelete(id);

    if (!deletedSubject) {
      return NextResponse.json(
        { message: "Subject not found or already deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Subject deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete Subject Error:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();

  try {
    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    await DBConnect();
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    const { title, description } = await request.json();

    const subject = await Subjects.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    if (!subject) {
      return NextResponse.json(
        { message: "Subject not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Subject updated successfully", subject },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update Subject Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
