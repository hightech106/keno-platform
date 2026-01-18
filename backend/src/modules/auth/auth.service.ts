import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AdminModel } from "./admin.model";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export async function registerAdmin(
  email: string,
  password: string
) {
  const existing = await AdminModel.findOne({ email });
  if (existing) {
    throw new Error("Admin already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  
  const adminCount = await AdminModel.countDocuments();

  const admin = await AdminModel.create({
    email,
    passwordHash,
    role: adminCount === 0 ? "SUPER_ADMIN" : "OPERATOR_ADMIN"
  });

  return admin;
}

export async function loginAdmin(
  email: string,
  password: string
) {
  const admin = await AdminModel.findOne({ email });
  if (!admin) {
    throw new Error("Invalid credentials");
  }

  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      adminId: admin._id.toString(),
      role: admin.role
    },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  return token;
}
