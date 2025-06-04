import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

import { fitPlanGuard } from "@/types/guards/fitPlanGuard";
import { RootState } from "@/types/interfaces/store";
import { FitPlan } from "@/types/interfaces/fitness-plan";

import { errorResponse } from "@/lib/services/errorResponse";
import { ENV } from "@/lib/services/envService";

import { extractState, setContent } from "@/app/api/get-plan/functions";
import { aiPrompt } from "@/app/api/get-plan/ai-prompt";

export async function POST(request: NextRequest) {
  const openai = new OpenAI({ apiKey: ENV.OPENAI_API_KEY });
  const state = (await request.json()) as RootState;
  console.log("get-plan: ", state);

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
      model: "gpt-3.5-turbo",
      store: true,
    });

    const plan = completion.choices[0].message.content;
    if (!plan) {
      return errorResponse(
        "There was nothing returned from AI, please try again later",
        404,
        true
      );
    }

    const json = JSON.parse(plan) as { fitnessPlan: FitPlan };

    if (!fitPlanGuard(json?.fitnessPlan)) {
      return errorResponse(
        "An unexpected structure was returned, your information may be corrupted, please try later",
        502,
        true
      );
    }

    return NextResponse.json(json.fitnessPlan, { status: 200 });
  } catch (error) {
    return errorResponse(`An unexpected error occured:${error}`, 500, true);
  }
}
