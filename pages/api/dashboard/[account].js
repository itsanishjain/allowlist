import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../../../src/utils/firebase";
import { REDIS_CACHE_TTL } from "../../../src/utils/constants";
import redis from "../../../src/utils/redis";

const handler = async (req, res) => {
  const { account } = req.query;

  const cacheRef = `dashboard:${account}`;
  const cachedData = await redis.get(cacheRef);

  if (cachedData) return res.json(JSON.parse(cachedData));

  const projectsRef = collection(db, "projects");
  const q = query(projectsRef, where("creator", "==", account));

  return getDocs(q)
    .then(async (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      await redis.set(cacheRef, JSON.stringify(data), "EX", REDIS_CACHE_TTL);

      return res.json(data);
    })
    .catch((err) => err);
};

export default handler;
