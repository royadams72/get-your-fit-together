// utils/handleApiError.ts

import { NextResponse } from "next/server";
import { ApiError } from "@/lib/services/ApiError";

export function handleApiError(error: unknown) {
  const isAppError = error instanceof ApiError;

  return NextResponse.json(
    {
      error: isAppError ? error.message : "An unexpected error occurred",
      code: isAppError ? error.ignore : undefined,
    },
    { status: isAppError ? error.status : 500 }
  );
}
