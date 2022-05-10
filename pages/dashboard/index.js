import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/router";
import { collection, query, where, getDocs } from "firebase/firestore";

import { db } from "../../src/utils/firebase";
import { connectors } from "../../src/utils/connectors";
import Dashboard from "../../src/components/Dashboard";

const DashboardPage = () => {
  const { account, activate } = useWeb3React();

  const [data, setData] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const provider = localStorage.getItem("provider");
    activate(connectors[provider], () => {
      console.log("error");
      router.push("/");
    });
  }, [activate, router]);

  useEffect(() => {
    if (!account) return;

    const projectsRef = collection(db, "projects");
    const q = query(projectsRef, where("user", "==", account));
    getDocs(q)
      .then((snapshot) => {
        setData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      })
      .catch((err) => console.log(err));
  }, [account]);

  return (
    <div>
      Dashboard -
      {data.length != 0
        ? data.map((d, index) => <Dashboard key={index} data={d} />)
        : "NO DATA"}
    </div>
  );
};

export default DashboardPage;
