import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { getDoc, doc } from "firebase/firestore";

import { db } from "../../../src/utils/firebase";
import { UserContext } from "../../../src/context/UserContext";
import { redis, setKey } from "../../../src/utils/redis";
import ProjectInfo from "../../../src/components/ProjectInfo";
import RegisterUserList from "../../../src/components/RegisterUserList";
import WalletRequirement from "../../../src/components/WalletRequirement";

const Tab = ({ tabName, data }) => {
  const tab = {
    projectInfo: <ProjectInfo data={data} />,
    walletRequirement: <WalletRequirement data={data} />,
    registerUserList: <RegisterUserList users={data.users} />,
  };

  return <>{tab[tabName]}</>;
};

const Settings = ({ data }) => {
  const { isLoggedIn } = useContext(UserContext);

  const [activeTab, setActiveTab] = useState("projectInfo");

  const router = useRouter();

  const getClassNames = (tabName) => {
    const tabClassName = {
      active:
        "text-center block border border-orange-500 rounded py-2 px-4 bg-orange-500 hover:bg-orange-700 text-white",
      inactive: "text-center text-black block rounded py-2 px-4 text-white",
    };

    return tabName === activeTab ? tabClassName.active : tabClassName.inactive;
  };

  useEffect(() => {
    if (!isLoggedIn) return router.push("/login");
  }, [isLoggedIn, router]);

  return (
    <div className='mt-8'>
      <ul className='flex mb-8 max-w-3xl mx-auto '>
        <li
          onClick={() => setActiveTab("projectInfo")}
          className='flex-1 mr-2  cursor-pointer'>
          <a className={getClassNames("projectInfo")}>Project Info</a>
        </li>
        <li
          onClick={() => setActiveTab("walletRequirement")}
          className='flex-1 mr-2  cursor-pointer'>
          <a className={getClassNames("walletRequirement")}>
            Wallet Requirements
          </a>
        </li>
        <li
          onClick={() => setActiveTab("registerUserList")}
          className='flex-1 mr-2 cursor-pointer'>
          <a className={getClassNames("registerUserList")}>Registered Users</a>
        </li>
      </ul>

      <Tab tabName={activeTab} data={data} />
    </div>
  );
};

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

export default Settings;
