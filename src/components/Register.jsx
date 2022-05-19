import { useEffect, useState, useContext, useCallback } from "react";
import { useRouter } from "next/router";
import { Contract, providers, utils } from "ethers";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

import { db } from "../utils/firebase";
import { UserContext } from "../context/UserContext";
import { abi } from "../smartContract";

import Wallet from "../components/Wallet";

const UserRegister = ({ data }) => {
  const { user: account, library, chainId } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [temp, setTemp] = useState(false);

  const router = useRouter();

  const checkWalletBalance = useCallback(async () => {
    if (chainId == 4 && library.connection.url != "metamask") {
      library.provider.http.connection.url = `https://rinkeby.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`;
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
  }, [
    account,
    chainId,
    data.ethAmount,
    library.connection.url,
    library.provider,
  ]);

  const checkNFTBalance = useCallback(async () => {
    if (chainId == 4 && library.connection.url != "metamask") {
      library.provider.http.connection.url = `https://rinkeby.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`;
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
  }, [
    account,
    chainId,
    data.contractAddress,
    library.connection.url,
    library.provider,
  ]);

  useEffect(() => {
    if (!account) return;
    setIsRegistered(data.users.includes(account));
    checkWalletBalance();
    if (data.contractAddress) checkNFTBalance();
  }, [
    account,
    checkNFTBalance,
    checkWalletBalance,
    data.contractAddress,
    data.users,
  ]);

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
        {!isRegistered
          ? temp && <button onClick={handleSubmit}>Register</button>
          : "ALREADY REGISTER"}
      </>

      {loading && "Registering.................."}
    </div>
  );
};

export default UserRegister;
