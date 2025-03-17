import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/mongodb";
import { DbResponse } from "@/types/interfaces/api";

export async function POST(req: Request) {
  try {
    const db = await connectToDB();
    const collection = db.collection("reduxStates");

    const { userPassword } = await req.json();

    const plan: DbResponse | null = await collection.findOne<DbResponse | null>(
      {
        userPassword,
      }
    );

    if (plan) {
      const { savedState } = plan;

      return NextResponse.json(savedState, { status: 200 });
    } else {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to save state" },
      { status: 500 }
    );
  }
}
