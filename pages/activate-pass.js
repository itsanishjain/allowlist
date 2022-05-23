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
    <div className='mt-8'>
      <div className='max-w-md mx-auto'>
        <div className='w-full h-96 md:h-[1rem] md:w-[5rem]'>
          <Image
            src={allowlistNFTImage}
            alt='hero image'
            width='100%'
            height='100%'
            layout='responsive'
          />
        </div>
      </div>
      <p className='text-xl text-center'>Activate Pass</p>
      {allowlistNFT.isActivated ? (
        <p>Activated</p>
      ) : (
        !allowlistNFT.isChainIdWrong && <Mint />
      )}
    </div>
  );
};

export default ActivatePass;
