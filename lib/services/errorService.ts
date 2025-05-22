import { CustomApiError, ResponseOptions } from "@/types/interfaces/api";
import { NextResponse } from "next/server";

export const errorService = (
  apiError: CustomApiError,
  responseOptions: ResponseOptions
) => {
  const { error, ignore } = apiError;
  const { status } = responseOptions;

  const redirectUrl = `/error?error=${encodeURIComponent(error)}`;
  console.error(`Error Status: ${status} - ${error}- ignore: ${ignore}`);
  if (!ignore) {
    return NextResponse.redirect(redirectUrl);
  }
};
