import mongoose from "mongoose";

const KenoRoundSchema = new mongoose.Schema(
  {
    operatorId: { type: String, required: true },
    userId: { type: String, required: true },
    betAmount: { type: Number, required: true },
    numbers: [Number],
    drawnNumbers: [Number],
    matches: Number,
    winAmount: Number
  },
  { timestamps: true }
);

export const KenoRoundModel = mongoose.model(
  "KenoRound",
  KenoRoundSchema
);
