export const isEmpty = (obj: any = {}): boolean => {
  // TODO: add a skip array, that will skip certain fields
  console.log("array", obj);
  if (Array.isArray(obj)) {
    return obj.length === 0; // Empty array check
  }

  if (typeof obj === "object" && obj !== null) {
    // Check if any value is not empty, return false if found
    for (const value of Object.values(obj)) {
      if (value) {
        return false; // Return false immediately if a non-empty value is found
      }
    }

    return true; // Return true if all values are empty
  }

  return !obj;
};

export const isNotEmpty = (obj: any = {}): boolean => !isEmpty(obj);
