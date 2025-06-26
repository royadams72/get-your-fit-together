import Redis from "ioredis";
import { ENV } from "@/lib/services/env.service";

const redis = new Redis(ENV.GYFT_REDIS_URL, {
  keyPrefix: ENV.REDIS_KEY_PREFIX,
});

export default redis;
