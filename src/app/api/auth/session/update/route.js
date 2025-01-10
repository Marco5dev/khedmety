import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    const data = await request.json();

    // Update the session
    session.user = {
      ...session.user,
      ...data.user
    };

    return NextResponse.json({ session }, { status: 200 });
  } catch (error) {
    console.error('Session update error:', error);
    return NextResponse.json(
      { message: "Error updating session" },
      { status: 500 }
    );
  }
}
