import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../../../src/utils/firebase";
import { redis, setKey } from "../../../src/utils/redis";

const handler = async (req, res) => {
  const { account } = req.query;
  var isRedisWorking = true;

  const cacheRef = `dashboard:${account}`;
  const cachedData = await redis
    .get(cacheRef)
    .then((res) => JSON.parse(res))
    .catch(() => (isRedisWorking = false));

  if (isRedisWorking && cachedData) return res.json(cachedData);

  const projectsRef = collection(db, "projects");
  const q = query(projectsRef, where("creator", "==", account));

  return getDocs(q)
    .then(async (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      if (isRedisWorking) await setKey(cacheRef, data);

      return res.json(data);
    })
    .catch((err) => err);
};

export default handler;
