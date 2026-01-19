import mongoose from "mongoose";
import { OperatorConfig } from "./operator.types";

const OperatorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    config: { type: Object, required: true },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const OperatorModel = mongoose.model("Operator", OperatorSchema);
