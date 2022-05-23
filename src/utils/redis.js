import Redis from "ioredis";
import { REDIS_CACHE_TTL, REDIS_URL } from "./constants";

const redis = new Redis(REDIS_URL);

redis.on("connect", () => console.log("Redis connected"));

redis.on("error", (err) => {
  console.log("Redis error: ", err);
  redis.disconnect();
});

const setKey = async (key, value) =>
  await redis.set(key, JSON.stringify(value), "EX", REDIS_CACHE_TTL);

export { redis, setKey };
