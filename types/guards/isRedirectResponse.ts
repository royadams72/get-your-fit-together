export function isRedirectResponse(
  obj: any
): obj is { redirect: true | boolean } {
  return obj && typeof obj === "object" && "redirect" in obj;
}
