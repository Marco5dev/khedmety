import bcrypt from 'bcryptjs';
import Subjects from "@/model/Subjects";
import User from "@/model/User";
import { subjectsDBConnect } from "@/utils/mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
    await subjectsDBConnect();
    const { subjectid } = request.query;
    const subject = await Subjects.findOne({ _id: subjectid });
    const userid = subject.data.userid;
    const userdata = await User.findOne({ _id: userid })

    try {
        if(!subjects){
            return NextResponse.json(
                { message: "Data dosn't exists" },
                { status: 404 }
              );
        } else {
            return NextResponse.json(
                { subject, user },
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

export async function DELETE(request) {
    await subjectDBConnect();
    const { subjectid } = request.query;

    try {
        const subject = await User.findOne({ _id: subjectid }); // Find the user by ID
        if (subject) {
          await Subjects.deleteOne({ _id: subjectid }); // Delete the subject
          return NextResponse.json(
            { message: `User with ID ${subjectid} deleted.` },
            { status: 200 }
          );
        } else {
            return NextResponse.json(
              { message: `subject with ID ${subjectid} not found.` },
              { status: 404 }
            );
        }
      } catch (error) {
        console.error('Error deleting Subject:', error);
        return NextResponse.json(
            { message: `Internal server error` },
            { status: 500 }
          );
      }
}