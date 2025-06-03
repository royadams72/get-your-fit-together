/**
 * @jest-environment node
 */
// import "openai/shims/node";

import OpenAI from "openai";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/get-plan/route";
import { reduxMock } from "@/__mocks__/reduxMock";
import { fitnessPlanMock } from "@/__mocks__/fitnessPlanMock";

jest.mock("openai");

const createRequest = (): NextRequest =>
  ({
    json: jest.fn().mockResolvedValue(reduxMock),
    cookies: {},
    nextUrl: new URL("http://localhost"),
    page: {},
    ua: {},
  } as unknown as NextRequest);

const mockOpenAI = (responseContent: any) => {
  const mockCreate = jest.fn().mockResolvedValue({
    choices: [
      {
        message: {
          content: JSON.stringify(responseContent),
        },
      },
    ],
  });

  (OpenAI as unknown as jest.Mock).mockImplementation(() => ({
    chat: {
      completions: {
        create: mockCreate,
      },
    },
  }));

  return mockCreate;
};

describe("POST /api/get-plan", () => {
  it("returns a valid plan when AI response is successful", async () => {
    mockOpenAI(fitnessPlanMock);
    const response = await POST(createRequest());
    const jsonData = await response.json();

    expect(response.status).toBe(200);
    expect(jsonData.overview.title).toBe("Overview");
  });

  it("returns an error when AI response is incomplete", async () => {
    const partialPlan = {
      fitnessPlan: {
        overview: fitnessPlanMock.fitnessPlan.overview,
        weeklySchedule: fitnessPlanMock.fitnessPlan.weeklySchedule,
      },
    };

    mockOpenAI(partialPlan);
    const response = await POST(createRequest());
    const json = await response.json();

    expect(json).toEqual({
      error:
        "An unexpected structure was returned, your information may be corrupted, please try later",
      redirect: true,
    });
  });

  it("returns an error when AI response is unsuccessful", async () => {
    mockOpenAI(undefined); // or null if you prefer
    const response = await POST(createRequest());
    const json = await response.json();

    expect(json).toEqual({
      error: "There was nothing returned from AI, please try again later",
      redirect: true,
    });
  });
});
