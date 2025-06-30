import { ResponseType } from "@/types/enums/response.enum";

export class AppError extends Error {
  action?: ResponseType;

  constructor(message: string, action?: ResponseType) {
    super(message);
    this.name = "AppError";
    this.action = action;
  }
}
