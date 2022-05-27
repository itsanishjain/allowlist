import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import { providers, utils } from "ethers";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

import { db } from "../utils/firebase";
import { UserContext } from "../context/UserContext";
import { INFURA_RINKEBY_URL } from "../utils/constants";
import Wallet from "./Wallet";
import Loader from "./Loader";

const UserRegister = ({ data }) => {
  const { account, library, chainId, isNFTOwned } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState();
  const [validForRegistration, setValidForRegistration] = useState({
    hasETH: true,
    hasNFT: true,
  });
  const [isFunctionLoading, setIsFunctionLoading] = useState({
    ethFunction: true,
    nftFunction: true,
  });

  const router = useRouter();

  const hasEnoughETH = async () => {
    if (chainId == 4 && library.connection.url != "metamask") {
      library.provider.http.connection.url = INFURA_RINKEBY_URL;
    }

    const provider = await library.provider;
    const web3Provider = new providers.Web3Provider(provider);
    let balance = await web3Provider.getBalance(account);

    return parseFloat(data.ethAmount) <= parseFloat(utils.formatEther(balance));
  };

  const handleSubmit = async () => {
    setLoading(true);

    await updateDoc(doc(db, "projects", router.query.id), {
      users: arrayUnion(account),
    })
      .then(() => {
        setIsRegistered(true);
        axios.post("/api/project/update", {
          ...data,
          users: [...data.users, account],
        });
      })
      .catch((err) => console.log(err));

    setLoading(false);
  };

  useEffect(() => {
    if (!account) return;
    setIsRegistered(data?.users.includes(account));

    // Check required ETH Balance
    if (data.ethAmount) {
      hasEnoughETH().then((res) => {
        setValidForRegistration((prev) => ({ ...prev, hasETH: res }));
        setIsFunctionLoading((prev) => ({ ...prev, ethFunction: false }));
      });
    } else {
      setIsFunctionLoading((prev) => ({ ...prev, ethFunction: false }));
    }

    if (data.contractAddress) {
      // 3rd parameter checkChainId=false
      isNFTOwned(account, data.contractAddress, false).then((res) => {
        setValidForRegistration((prev) => ({ ...prev, hasNFT: res }));
        setIsFunctionLoading((prev) => ({ ...prev, nftFunction: false }));
      });
    } else {
      setIsFunctionLoading((prev) => ({ ...prev, nftFunction: false }));
    }
  }, [account]);

  return (
    <div className='max-w-lg mx-auto p-4 mt-8 bg-gray-100 space-y-8'>
      <p className='text-md font-medium'>{data.name}</p>
      <p className='text-sm font-normal'>{data.description}</p>

      <div className='w-full h-96 md:h-auto md:w-48'>
        <Image
          src={data.profileImage}
          alt='hero image'
          width='100%'
          height='100%'
          layout='responsive'
        />
      </div>
      <div>
        {isRegistered ? (
          "Already Registered"
        ) : (
          <>
            <Wallet />
            {account &&
              (!isFunctionLoading.ethFunction &&
              !isFunctionLoading.nftFunction ? (
                <div>
                  {validForRegistration.hasETH &&
                  validForRegistration.hasNFT ? (
                    <div className='mt-8'>
                      <button onClick={handleSubmit}>Register</button>
                    </div>
                  ) : (
                    <div className='mt-8'>
                      {!validForRegistration.hasETH &&
                        `Have at least ${data.ethAmount} ETH in your wallet`}
                      {!validForRegistration.hasNFT &&
                        `NO ${data.contractName}`}
                      <div className='mt-8'>
                        <button className='bg-gray-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed'>
                          Register
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Loader />
              ))}
          </>
        )}
      </div>

      {loading && <Loader />}
    </div>
  );
};

export default UserRegister;
