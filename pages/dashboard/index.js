import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";

import { UserContext } from "../../src/context/UserContext";
import Loader from "../../src/components/Loader";
import Dashboard from "../../src/components/Dashboard";

const DashboardPage = () => {
  const { account, isLoggedIn } = useContext(UserContext);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) return router.push("/login");
    if (!account) return;

    fetch(`/api/dashboard/${account}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
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
