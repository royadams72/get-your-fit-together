import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

import { RootState } from "@/types/interfaces/store";
import { setContent } from "./setContent";
import { aiPrompt } from "./ai-prompt";
import { FitPlan } from "@/types/interfaces/fitness-plan";

export const extractState = (state: RootState, isSaving?: boolean) => {
  const { aboutYou, injuries, yourGoals, preferences, user } = state;

  return isSaving
    ? { aboutYou, injuries, yourGoals, preferences, user }
    : { aboutYou, injuries, yourGoals, preferences };
};

export async function POST(request: NextRequest) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const state = (await request.json()) as RootState;

  const mappedState = extractState(state);
  const userContent = await setContent(mappedState);
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "developer",
          content: aiPrompt,
        },
        {
          role: "user",
          content: userContent,
        },
      ],
      model: "gpt-4o",
      store: true,
    });

    const plan = completion.choices[0].message.content;
    if (!plan) {
      throw new Error("AI response content is null or empty");
    }

    const json = JSON.parse(plan) as { fitnessPlan: FitPlan };

    if (!json?.fitnessPlan?.overview || !json.fitnessPlan.weeklySchedule) {
      throw new Error("AI returned an unexpected structure");
    }

    return NextResponse.json(json.fitnessPlan, { status: 200 });
  } catch (error) {
    console.error("Unexpected API Error:", error);
    return NextResponse.json(`Unexpected API Error: ${error}`, {
      status: 500,
    });
  }
}
