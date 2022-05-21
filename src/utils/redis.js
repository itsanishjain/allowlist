import Redis from "ioredis";
import { REDIS_URL } from "./constants";

export default new Redis(REDIS_URL);
