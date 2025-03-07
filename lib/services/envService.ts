export const getEnv = (key: string): any => {
  const value = process.env[key];

  if (typeof value === "undefined") {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
};

export const ENV = {
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  BASE_URL: getEnv("NEXT_PUBLIC_BASE_URL"),
  OPENAI_API_KEY: getEnv("OPENAI_API_KEY"),
  MONGODB_URI: getEnv("MONGODB_URI"),
} as const;
