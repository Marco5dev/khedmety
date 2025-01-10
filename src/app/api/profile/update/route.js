import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";
import { DBConnect } from "@/utils/mongodb";
import User from "@/models/User";

export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    await DBConnect();
    const data = await request.json();
    
    // Validate email uniqueness if changed
    if (data.email !== session.user.email) {
      const existingUser = await User.findOne({ email: data.email });
      
      if (existingUser) {
        return NextResponse.json(
          { message: "Email already in use" },
          { status: 400 }
        );
      }
    }

    // Update user data
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        name: data.name,
        email: data.email,
        bio: data.bio
      },
      { new: true } // Return updated document
    ).select('-password'); // Exclude password from response

    if (!updatedUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        message: "Profile updated successfully", 
        user: {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          bio: updatedUser.bio,
          role: updatedUser.role,
          avatar: updatedUser.avatar
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { message: "Error updating profile" },
      { status: 500 }
    );
  }
}
