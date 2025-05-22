import { NextResponse } from "next/server";
import { CustomApiError, ResponseOptions } from "@/types/interfaces/api";
import { ENV } from "./envService";

export const errorService = (
  apiError: CustomApiError,
  responseOptions: ResponseOptions
) => {
  const { error, ignore } = apiError;
  const { status } = responseOptions;
  const newtUrl = `/error?error=${encodeURIComponent(error)}`;
  const redirectUrl = new URL(newtUrl, ENV.BASE_URL);
  //
  console.error(`Error Status: ${status} - ${error}- ignore: ${ignore}`);
  if (!ignore) {
    return NextResponse.json(apiError);
  }
};
