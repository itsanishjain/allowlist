import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { collection, query, where, getDocs } from "firebase/firestore";

import { db } from "../../src/utils/firebase";
import { UserContext } from "../../src/context/UserContext";
import Dashboard from "../../src/components/Dashboard";
import Loader from "../../src/components/Loader";

const DashboardPage = () => {
  const { account, isLoggedIn } = useContext(UserContext);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) return router.push("/login");
    if (!account) return;

    const projectsRef = collection(db, "projects");
    const q = query(projectsRef, where("creator", "==", account));
    getDocs(q)
      .then((snapshot) => {
        setData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [account, isLoggedIn, router]);

  if (isLoading && data.length === 0) return <Loader />;

  return (
    <div>
      <p className='text-center text-xl mt-4'>Dashboard</p>
      {data.map((d, index) => (
        <Dashboard key={index} data={d} />
      ))}
    </div>
  );
};

export default DashboardPage;
