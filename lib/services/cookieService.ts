"use server";
import { NextResponse } from "next/server";
import { CookieOptions } from "@/types/interfaces/cookies.types";
import { cookies } from "next/headers";

// Determines if we're in the browser
const isClient = typeof window !== "undefined";

const cookieService = {
  get: async (name: string): Promise<string | undefined> => {
    if (isClient) {
      const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
      return match?.[2];
    } else {
      return (await cookies()).get(name)?.value;
    }
  },

  set: async (
    name: string,
    value: string,
    options?: CookieOptions,
    response?: NextResponse
  ): Promise<void> => {
    if (isClient) {
      let cookieStr = `${name}=${value}; path=${options?.path || "/"}`;
      if (options?.expires) {
        cookieStr += `; expires=${options.expires.toUTCString()}`;
      }
      document.cookie = cookieStr;
    } else {
      if (response) {
        response.cookies.set(name, value);
      } else {
        (await cookies()).set(name, value);
      }
    }
  },

  delete: async (name: string, response?: NextResponse): Promise<void> => {
    if (isClient) {
      document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    } else {
      if (response) {
        response.cookies.delete(name);
      } else {
        (await cookies()).delete(name);
      }
    }
  },
};

export default cookieService;
