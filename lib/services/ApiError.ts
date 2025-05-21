export class ApiError extends Error {
  status: number;
  ignore?: boolean;

  constructor(public message: string, status = 500, ignore = false) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.ignore = ignore;
  }
}
