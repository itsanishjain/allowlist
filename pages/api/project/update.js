import { REDIS_CACHE_TTL } from "../../../src/utils/constants";
import redis from "../../../src/utils/redis";

const handler = async (req, res) =>
  await redis
    .set(
      `project:${req.body.id}`,
      JSON.stringify(req.body),
      "EX",
      REDIS_CACHE_TTL
    )
    .then(() => res.json({ success: true }))
    .catch((err) => ({ success: false, err }));

export default handler;
