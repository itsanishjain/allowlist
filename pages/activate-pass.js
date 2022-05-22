import { useEffect, useContext } from "react";
import { useRouter } from "next/router";

import { UserContext } from "../src/context/UserContext";
import Mint from "../src/components/Mint";

const ActivatePass = () => {
  const { isLoggedIn, allowlistNFT } = useContext(UserContext);

  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) return router.push("/login");
  }, [isLoggedIn, router]);

  return (
    <div className="mt-8">
      <p className="text-xl text-center">Activate Pass</p>
      {allowlistNFT.isActivated ? (
        <p>Activated</p>
      ) : (
        !allowlistNFT.isChainIdWrong && <Mint />
      )}
    </div>
  );
};

export default ActivatePass;
