import mongoose from "mongoose";
import dotenv from "dotenv";
import { OperatorModel } from "./operator.model";

dotenv.config();

// MongoDB URI from .env
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/keno-platform";

const operators = [
  {
    name: "OperatorA",
    config: {
      payoutTable: {
        1: { 0: 0, 1: 2 },
        2: { 0: 0, 1: 1, 2: 5 },
        3: { 0: 0, 1: 0.5, 2: 2, 3: 10 },
        4: { 0: 0, 1: 0.25, 2: 1, 3: 5, 4: 20 },
        5: { 0: 0, 1: 0.2, 2: 0.5, 3: 2, 4: 10, 5: 50 },
        // extend up to 10 picks
      },
      minBet: 10,
      maxBet: 1000,
      houseEdge: 0.11,
      currency: "USD",
      language: "en",
      branding: {
        logoUrl: "https://example.com/logoA.png",
        primaryColor: "#FF0000"
      }
    }
  },
  {
    name: "OperatorB",
    config: {
      payoutTable: {
        1: { 0: 0, 1: 1.8 },
        2: { 0: 0, 1: 0.8, 2: 4.5 },
        3: { 0: 0, 1: 0.4, 2: 1.8, 3: 9 },
        4: { 0: 0, 1: 0.2, 2: 0.8, 3: 4.5, 4: 18 },
        5: { 0: 0, 1: 0.1, 2: 0.4, 3: 1.8, 4: 9, 5: 45 },
      },
      minBet: 20,
      maxBet: 2000,
      houseEdge: 0.12,
      currency: "EUR",
      language: "fr",
      branding: {
        logoUrl: "https://example.com/logoB.png",
        primaryColor: "#0000FF"
      }
    }
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    // Remove existing operators
    await OperatorModel.deleteMany({});
    console.log("Existing operators removed");

    // Insert seed operators
    const inserted = await OperatorModel.insertMany(operators);
    console.log("Operators seeded successfully:");
    inserted.forEach(op => console.log(`- ${op.name} (${op._id})`));

    process.exit(0);
  } catch (err) {
    console.error("Error seeding operators:", err);
    process.exit(1);
  }
}

seed();
