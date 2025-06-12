export const isAnyFieldEmpty = (obj: any = {}): boolean => {
  if (typeof obj !== "object" || obj === null) {
    return !obj;
  }

  for (const value of Object.values(obj)) {
    if (typeof value === "object" && value !== null) {
      if (isAnyFieldEmpty(value)) {
        return true;
      }
    } else if (value === "" || value === null || value === undefined) {
      return true;
    }
  }

  return false;
};
