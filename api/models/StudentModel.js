import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    Student_ID: {
      type: "Number",
      required: true,
      unique: true,
    },
    Student_Name: {
      type: "String",
      required: true,
    },
    Department: {
      type: "String",
      required: true,
    },
    Email: {
      type: "String",
      required: true,
      unique: true,
    },
    Password: {
      type: "String",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("student", studentSchema);
