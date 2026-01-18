import mongoose from "mongoose";

export interface AdminDocument extends mongoose.Document {
  email: string;
  passwordHash: string;
  role: "SUPER_ADMIN" | "OPERATOR_ADMIN";
  createdAt: Date;
}

const AdminSchema = new mongoose.Schema<AdminDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["SUPER_ADMIN", "OPERATOR_ADMIN"],
      default: "OPERATOR_ADMIN"
    }
  },
  { timestamps: true }
);

export const AdminModel = mongoose.model<AdminDocument>(
  "Admin",
  AdminSchema
);
