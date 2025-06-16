import redis from "./redisClient";

export const getRedisData = async (sessionCookie: string) => {
  const data = await redis.get(`sessionCookie:${sessionCookie}`);
  console.log("data getRedisData::", data);
  return data ? JSON.parse(data) : null;
};
