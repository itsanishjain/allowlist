import { useEffect, useContext } from "react";
import { useRouter } from "next/router";

import { UserContext } from "../src/context/UserContext";
import Link from "next/link";
import Mint from "../src/components/Mint";

const ActivatePass = () => {
  const { isLoggedIn, isAllowlistActivated } = useContext(UserContext);

  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) return router.push("/login");
  }, [isLoggedIn, router]);

  return (
    <div>
      Activate Pass Page
      {isAllowlistActivated  ? (
        <p>Activated</p>
      ) : (
        <Mint />
      )}
    </div>
  );
};

export default ActivatePass;
