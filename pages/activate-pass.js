import { useEffect, useContext } from "react";
import { useRouter } from "next/router";

import { UserContext } from "../src/context/UserContext";

const ActivatePass = () => {
  const { isLoggedIn, isAllowlistActivated } = useContext(UserContext);

  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) return router.push("/login");
  }, [isLoggedIn, router]);

  return (
    <div>
      Activate Pass Page
      {isAllowlistActivated ? (
        <p>Activated</p>
      ) : (
        <button>Activate</button>
      )}
    </div>
  );
};

export default ActivatePass;
