import Redis from "ioredis";
import { REDIS_URL } from "./constants";

const redis = new Redis(REDIS_URL);

redis.on("connect", () => console.log("Redis connected"));

redis.on("error", (err) => {
  console.log("Redis error: ", err);
  redis.disconnect();
});

export default redis;
