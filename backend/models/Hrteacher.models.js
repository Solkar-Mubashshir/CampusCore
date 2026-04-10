import mongoose from "mongoose";

const hrTeacherSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    rollNumber: {
      type: String,
      required: true,
      unique: true,
    },

     profilePicture: {
      type: String,
      default: null,
    },
    password: { type: String, required: true },

    role: {
      type: String,
      default: "hrteacher",
    },

    department: { type: String, required: true },

    employeeId: {
      type: String,
      required: true,
      unique: true,
    },

    accessLevel: {
      type: String,
      default: "analytics",
    },
  },
  { timestamps: true }
);

export default mongoose.model("HRTeacher", hrTeacherSchema);