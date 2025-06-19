export interface CookieOptions {
  path?: string;
  expires?: Date;
  httpOnly?: boolean;
  sameSite?: string;
  secure?: boolean;
}
