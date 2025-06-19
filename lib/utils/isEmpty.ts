// Returns true if all fields empty
export const isEmpty = (obj: any = {}): boolean => {
  if (Array.isArray(obj)) {
    return obj.length === 0;
  }

  if (typeof obj === "object" && obj !== null) {
    for (const value of Object.values(obj)) {
      if (value) {
        return false;
      }
    }

    return true;
  }

  return !obj;
};

export const isNotEmpty = (obj: any = {}): boolean => !isEmpty(obj);
