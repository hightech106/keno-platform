import mongoose, { Schema, Document } from "mongoose";

export interface IKenoRound extends Document {
  roundId: string;
  operatorId: string;
  userId: string;
  betAmount: number;
  numbers: number[];
  drawnNumbers: number[];
  matches: number;
  winAmount: number;
  createdAt: Date;
}

const KenoRoundSchema: Schema = new Schema({
  roundId: { type: String, required: true, unique: true },
  operatorId: { type: Schema.Types.ObjectId, ref: "Operator", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  betAmount: { type: Number, required: true },
  numbers: { type: [Number], required: true },
  drawnNumbers: { type: [Number], required: true },
  matches: { type: Number, required: true },
  winAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const KenoRoundModel = mongoose.model<IKenoRound>("KenoRound", KenoRoundSchema);
