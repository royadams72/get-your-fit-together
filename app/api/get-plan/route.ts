import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { RootState } from "@/lib/store/store";
import { setContent } from "../setContent";

const extractState = (state: RootState) => {
  const { aboutYou, injuries, yourGoals, preferences } = state;
  return { aboutYou, injuries, yourGoals, preferences };
};
export async function POST(request: NextRequest) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const state = await request.json();

  const mappedState = extractState(state);
  const userContent = await setContent(mappedState);

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "developer",
        content:
          "You are a personal trainer, you should set out answers in sections and offer no follow up question, when possible supply free youtube video link for exercises",
      },
      {
        role: "user",
        content: userContent,
      },
    ],
    model: "gpt-4o",
    store: true,
  });
  // {
  //   finish_reason: "stop",
  //   index: 0,
  //   logprobs: 0,
  //   message: { content: "fitnes stuff", refusal: "", role: "something" },
  // },
  //
  return NextResponse.json(completion.choices[0], { status: 200 });
}
