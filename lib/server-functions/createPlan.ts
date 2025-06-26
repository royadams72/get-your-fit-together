import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

import { fitPlanGuard } from "@/types/guards/fitPlanGuard";
import { RootState } from "@/types/interfaces/store";
import { FitPlan } from "@/types/interfaces/fitness-plan";

// import { errorResponse } from "@/lib/services/errorResponse";
import { ENV } from "@/lib/services/env.service";

import {
  extractState,
  setContent,
} from "@/lib/server-functions/ai-utils/functions";
import { aiPrompt } from "@/lib/server-functions/ai-utils/ai-prompt";

export async function createPlan(state: RootState) {
  const openai = new OpenAI({ apiKey: ENV.OPENAI_API_KEY });

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
      throw new Error("No Fitplan created");
    }

    const json = JSON.parse(plan) as { fitnessPlan: FitPlan };

    if (!fitPlanGuard(json?.fitnessPlan)) {
      throw new Error(
        "An unexpected structure was returned, your information may be corrupted, please try later"
      );
    }

    return json.fitnessPlan;
  } catch (error) {
    console.error(`There was an error: ${error}`);
  }
}
