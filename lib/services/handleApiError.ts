import { NextResponse } from "next/server";
import { ApiError } from "@/lib/services/ApiError";
import { errorService } from "@/lib/services/errorService";
import { ErrorObj, ResponseOptions } from "@/types/interfaces/api";

export function handleApiError(error: unknown) {
  const isAppError = error instanceof ApiError;

  const responseOptions: ResponseOptions = {
    status: isAppError ? error.status : 500,
  };
  const errObject: ErrorObj = {
    error: isAppError ? error.message : "An unexpected error occurred",
    ignore: isAppError ? error.ignore : undefined,
  };

  const redirect = errorService(errObject, responseOptions);
  if (redirect) {
    return redirect;
  }
  return NextResponse.json(errObject, responseOptions);
}
