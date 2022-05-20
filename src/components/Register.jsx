import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { Contract, providers, utils } from "ethers";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

import { db } from "../utils/firebase";
import { abi } from "../smartContract";
import { UserContext } from "../context/UserContext";
import { INFURA_RINKEBY_URL } from "../utils/constants";
import Wallet from "../components/Wallet";

const UserRegister = ({ data }) => {
  const { account, library, chainId } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [temp, setTemp] = useState(false);

  const router = useRouter();

  const checkWalletBalance = async () => {
    if (chainId == 4 && library.connection.url != "metamask") {
      library.provider.http.connection.url = INFURA_RINKEBY_URL;
    }

    const provider = await library.provider;
    const web3Provider = new providers.Web3Provider(provider);

    let balance = await web3Provider.getBalance(account);
    if (parseFloat(data.ethAmount) <= parseFloat(utils.formatEther(balance))) {
      console.log("Hell Yeh you can Register for premint you are a rich guy");
      setTemp(true);
    } else {
      // alert("Not enough ETH")
      console.log("BRO get Lost");
    }

    console.log(account + ":" + utils.formatEther(balance));
  };

  const checkNFTBalance = async () => {
    if (chainId == 4 && library.connection.url != "metamask") {
      library.provider.http.connection.url = INFURA_RINKEBY_URL;
    }

    const provider = await library.provider;
    const web3Provider = new providers.Web3Provider(provider);

    const contract = new Contract(
      data.contractAddress,
      abi,
      web3Provider.getSigner()
    );

    const isContractExist = await web3Provider.getCode(data.contractAddress);

    console.log({ isContractExist });

    if (isContractExist === "0x") {
      console.log("NFT NOT ON THIS CHAIN");
      return;
    }

    const response = await contract.balanceOf(account);

    if (parseInt(response)) {
      // alert("YOU OWN THE NFT WE WANT")
      console.log("Fuck Yeh You own this NFT", parseInt(response));
      setTemp(true);
    } else {
      // alert(`You dont own ${data.contractName}`)
      console.log("Get the fuck of ", parseInt(response));
    }
  };

  useEffect(() => {
    if (!account) return;
    setIsRegistered(data.users.includes(account));
    checkWalletBalance();
    if (data.contractAddress) checkNFTBalance();
  }, [account]);

  const handleSubmit = async () => {
    setLoading(true);

    await updateDoc(doc(db, "projects", router.query.id), {
      users: arrayUnion(account),
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setLoading(false);
  };

  return (
    <div>
      <p>{data.name}</p>
      <p>{data.description}</p>

      <p>REGISTER PAGE</p>
      <Wallet />

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
      </>

      {loading && "Registering.................."}
    </div>
  );
};

export default UserRegister;
