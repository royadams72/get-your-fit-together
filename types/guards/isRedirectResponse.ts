export const isRedirectResponse = <T>(
  res: T | { redirect: { error: string } }
): res is { redirect: { error: string } } => {
  return typeof res === "object" && res !== null && "redirect" in res;
};
