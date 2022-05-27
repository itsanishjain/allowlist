import { redis } from "../../../src/utils/redis";

const handler = async (req, res) =>
  await redis
    .del(`project:${req.body.projectId}`)
    .then(() => res.json({ success: true, err: null }))
    .catch((err) => res.json({ success: false, err }));

export default handler;
