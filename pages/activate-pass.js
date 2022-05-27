import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { UserContext } from "../src/context/UserContext";
import Mint from "../src/components/Mint";

import allowlistNFTImage from "../src/images/AllowlistFinalNFT.png";

const ActivatePass = () => {
  const { isLoggedIn, allowlistNFT } = useContext(UserContext);

  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) return router.push("/login");
  }, [isLoggedIn, router]);

  return (
    <div className='mt-8 max-w-3xl mx-auto flex flex-col items-center space-y-4'>
      <p className='text-xl text-center'>Activate Pass</p>
      <div className='w-full md:w-1/2 p-1'>
        <div className='w-full h-auto overflow-hidden object-cover'>
          <Image src={allowlistNFTImage} alt='hero image' />
        </div>
      </div>
      {allowlistNFT.isActivated ? (
        <p className='font-mono text-xl text-green-400'>Activated</p>
      ) : !allowlistNFT.isChainIdWrong ? (
        <Mint />
      ) : (
        <p>Please connect to Polygon Mainnet</p>
      )}
    </div>
  );
};

export default ActivatePass;
