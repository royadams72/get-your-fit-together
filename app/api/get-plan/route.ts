import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function GET() {
  // const completion = await openai.chat.completions.create({
  //   messages: [{ role: "developer", content: "You are a helpful assistant." }],
  //   model: "gpt-4o",
  //   store: true,
  // });

  // console.log(completion.choices[0]);
  // return NextResponse.json(completion.choices[0], { status: 200 });
}
