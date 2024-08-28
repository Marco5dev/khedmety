import mongoose from "mongoose";

const SubjectsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: false,
    },
    description: {
      type: String,
      required: true,
    },
    userid: {
      type: String,
      required: true,
      unique: false,
    }
  },
  { timestamps: true }
);

const Subjects = mongoose.models.Subjects || mongoose.model("Subjects", SubjectsSchema);

export default Subjects;
