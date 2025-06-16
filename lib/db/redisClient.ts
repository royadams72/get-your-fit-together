import Redis from "ioredis";
import { ENV } from "@/lib/services/envService";

const redis = new Redis(ENV.REDIS_URL, { keyPrefix: ENV.REDIS_KEY_PREFIX });

export default redis;
