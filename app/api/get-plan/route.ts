import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

import { ApiError } from "@/lib/services/ApiError";

import { fitPlanGuard } from "@/types/guards/fitPlanGuard";
import { RootState } from "@/types/interfaces/store";
import { FitPlan } from "@/types/interfaces/fitness-plan";

import { setContent } from "@/app/api/get-plan/setContent";
import { aiPrompt } from "@/app/api/get-plan/ai-prompt";
import { handleApiError } from "@/lib/services/handleApiError";

export const extractState = (state: RootState) => {
  const { aboutYou, injuries, yourGoals, preferences } = state;

  return { aboutYou, injuries, yourGoals, preferences };
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
      throw new ApiError("AI response content is null or empty", 404);
    }

    const json = JSON.parse(plan) as { fitnessPlan: FitPlan };

    if (!fitPlanGuard(json?.fitnessPlan)) {
      throw new ApiError("AI returned an unexpected structure", 502);
    }

    return NextResponse.json(json.fitnessPlan, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
}
