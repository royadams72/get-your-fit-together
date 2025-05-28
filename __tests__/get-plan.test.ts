/**
 * @jest-environment node
 */

import "openai/shims/node";

import OpenAI from "openai";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/get-plan/route";
import { reduxMock } from "@/__mocks__/reduxMock";
import { fitnessPlanMock } from "@/__mocks__/fitnessPlanMock";

jest.mock("openai");

beforeEach(async () => {});

describe("POST /api/get-plan", () => {
  it("returns a valid plan when AI response is successful", async () => {
    // (fitPlanGuard as unknown as jest.Mock).mockReturnValue(true);

    // Mock OpenAI completion
    const mockCreate = jest.fn().mockResolvedValue({
      choices: [
        {
          message: {
            content: JSON.stringify(fitnessPlanMock),
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

    const request = {
      json: jest.fn().mockResolvedValue(reduxMock),
      cookies: {},
      nextUrl: new URL("http://localhost"),
      page: {},
      ua: {},
    } as unknown as NextRequest;

    const response = await POST(request);

    expect(response.status).toBe(200);

    const jsonData = await response.json();
    expect(jsonData.overview.title).toBe("Overview");
  });

  it("returns an error when AI response is incomplete", async () => {
    const partFitnessPlan = {
      fitnessPlan: {
        overview: fitnessPlanMock.fitnessPlan.overview,
        weeklySchedule: fitnessPlanMock.fitnessPlan.weeklySchedule,
      },
    };
    const mockCreate = jest.fn().mockResolvedValue({
      choices: [
        {
          message: {
            content: JSON.stringify(partFitnessPlan),
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

    const request = {
      json: jest.fn().mockResolvedValue(reduxMock),
      cookies: {},
      nextUrl: new URL("http://localhost"),
      page: {},
      ua: {},
    } as unknown as NextRequest;

    const response = await POST(request);
    const errorResponse = await response.json();

    expect(errorResponse).toEqual({
      error:
        "An unexpected structure was returned, your information may be corrupted, please try later",
      redirect: true,
    });
  });

  it("returns an error when AI response is unsuccessful", async () => {
    const mockCreate = jest.fn().mockResolvedValue({
      choices: [
        {
          message: {
            content: JSON.stringify(undefined),
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

    const request = {
      json: jest.fn().mockResolvedValue(reduxMock),
      cookies: {},
      nextUrl: new URL("http://localhost"),
      page: {},
      ua: {},
    } as unknown as NextRequest;

    const response = await POST(request);
    const errorResponse = await response.json();

    expect(errorResponse).toEqual({
      error: "There was nothing returned from AI, please try again later",
      redirect: true,
    });
  });
});
