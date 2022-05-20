import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { Contract, providers, utils } from "ethers";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

import { db } from "../utils/firebase";
import { abi } from "../smartContract";
import { UserContext } from "../context/UserContext";
import { INFURA_RINKEBY_URL } from "../utils/constants";
import Wallet from "../components/Wallet";
import Loader from "./Loader";

const UserRegister = ({ data }) => {
  const { account, library, chainId, isNFTOwned } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  const [isRegistered, setIsRegistered] = useState();
  const [validForRegistration, setValidForRegistration] = useState(false);

  const router = useRouter();

  const hasEnoughETH = async () => {
    if (chainId == 4 && library.connection.url != "metamask") {
      library.provider.http.connection.url = INFURA_RINKEBY_URL;
    }

    const provider = await library.provider;
    const web3Provider = new providers.Web3Provider(provider);
    let balance = await web3Provider.getBalance(account);

    return parseFloat(data.ethAmount) <= parseFloat(utils.formatEther(balance))

  };

  const handleSubmit = async () => {
    setLoading(true);

    await updateDoc(doc(db, "projects", router.query.id), {
      users: arrayUnion(account),
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setLoading(false);
  };


  useEffect(() => {
    if (!account) return;
    setIsRegistered(data?.users.includes(account));
    if (hasEnoughETH()) setValidForRegistration(true)
    if (data.contractAddress) {
      isNFTOwned(account, data.contractAddress).then((res) => {
        setValidForRegistration(res)
      })
    }
  }, [account]);


  return (
    <div className="max-w-lg mx-auto p-4 mt-8">
      <p>{data.name}</p>
      <p>{data.description}</p>
      <img src={data.bannerImage} />
      <img src={data.profileImage} />

      {/* {data.ethAmount && `Have at least ${data.ethAmount} ETH in your wallet`} */}

      <p>REGISTER PAGE</p>
      <Wallet />
      {/* 
      <>
        {!isRegistered ? (
          temp ? (
            <button onClick={handleSubmit}>Register</button>
          ) : (
            "ERROR"
          )
        ) : (
          "ALREADY REGISTER"
        )}
      </> */}

      {loading && <Loader />}

    </div>
  );
};

export default UserRegister;
