import { setKey } from "../../../src/utils/redis";

const handler = async (req, res) =>
  await setKey(`project:${req.body.id}`, req.body)
    .then(() => res.json({ success: true, err: null }))
    .catch((err) => res.json({ success: false, err }));

export default handler;
