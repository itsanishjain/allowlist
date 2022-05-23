import redis from "../../../src/utils/redis";

const handler = async (req, res) =>
  await redis
    .del(`dashboard:${req.body.account}`)
    .then(() => res.json({ success: true }))
    .catch((err) => ({ success: false, err }));

export default handler;
