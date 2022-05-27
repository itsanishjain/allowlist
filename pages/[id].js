import { getDoc, doc } from "firebase/firestore";

import { db } from "../src/utils/firebase";
import { redis } from "../src/utils/redis";
import UserRegister from "../src/components/UserRegister";

const UserRegisterPage = ({ data }) => (
  <div>
    <p className='mt-2 text-2xl text-center text-black '>Allowlist</p>
    <UserRegister data={data} />
  </div>
);

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params;
  var isRedisWorking = true;

  const cacheRef = `project:${id}`;

  const cachedData = await redis
    .get(`project:${id}`)
    .then((res) => JSON.parse(res))
    .catch(() => (isRedisWorking = false));

  if (isRedisWorking && cachedData) return { props: { data: cachedData } };

  let data = {};

  await getDoc(doc(db, "projects", id))
    .then(async (res) => {
      data = { id: res.id, ...res.data() };
      if (isRedisWorking) await setKey(cacheRef, data);
    })
    .catch((err) => err);

  return { props: { data } };
};

export default UserRegisterPage;
