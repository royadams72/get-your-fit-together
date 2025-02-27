import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { setContent } from "../setContent";

const storeArray = ["aboutYou", "injuries", "yourGoals", "preferences"];
const formatFromSessionStorage = (
  arr: Array<string>,
  sessionData: { [key: string]: string }
) => {
  let obj: any;
  for (const prop of arr) {
    obj = {
      ...obj,
      ...JSON.parse(decodeURI(sessionData[prop])),
    };
  }
  return obj;
};
export async function POST(request: NextRequest) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  let { sessionData } = await request.json();
  sessionData = JSON.parse(sessionData);
  const store = formatFromSessionStorage(storeArray, sessionData);
  const userContent = await setContent(store);
  console.log(userContent);

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

  return NextResponse.json(completion.choices[0], { status: 200 });
}
