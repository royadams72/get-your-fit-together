import { ErrorObj, ResponseOptions } from "@/types/interfaces/api";

import { NextResponse } from "next/server";
export const errorResponse = (
  error: string,
  status: number,
  redirect: boolean
): NextResponse => {
  const errObject: ErrorObj = {
    error,
    redirect,
  };

  const responseOptions: ResponseOptions = {
    status,
  };
  console.log(errObject);

  return NextResponse.json(errObject, responseOptions);
};
