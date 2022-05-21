import { useEffect, useContext } from "react";
import { useRouter } from "next/router";

import { UserContext } from "../src/context/UserContext";
import Link from "next/link";

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
        <Link href="/mint" passHref>
          <button>Activate</button>
        </Link>
      )}
    </div>
  );
};

export default ActivatePass;
