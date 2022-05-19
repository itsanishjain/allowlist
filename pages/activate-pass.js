import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../src/context/UserContext";

const ActivatePass = () => {
  const {
    isLoggedIn,
    user: account,
    isUserOwnAllowlistNFT,
    isAllowlistActivated,
  } = useContext(UserContext);
  const router = useRouter();

  const [isOwnNFT, setIsOwnNFT] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) return router.push("/");
  }, [router, account, isLoggedIn]);

  const handleActivate = () => {};

  return (
    <div>
      Activate Pass Page
      {isAllowlistActivated ? (
        "Activated"
      ) : (
        <button onClick={handleActivate}>Activate</button>
      )}
    </div>
  );
};

export default ActivatePass;
