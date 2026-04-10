import mongoose from "mongoose";

const hodSchema = new mongoose.Schema(
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
    password: { type: String, required: true },

     profilePicture: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: "hod",
    },

    department: { type: String, required: true },

    employeeId: {
      type: String,
      required: true,
      unique: true,
    },

    permissions: {
      manageTimetable: { type: Boolean, default: true },
      manageTeachers: { type: Boolean, default: true },
      manageStudents: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model("HODTeacher", hodSchema);