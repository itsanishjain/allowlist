import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";
import { Contract, providers, utils } from "ethers";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";

import { db } from "../utils/firebase";
import { abi } from "../smartContract";
import { connectors } from "../utils/connectors";
import Wallet from "../components/Wallet";

const UserRegister = ({ data }) => {
  console.log({ data });

  const [loading, setLoading] = useState(false);

  const [isShowRegistered, setIsShowRegintered] = useState(false);

  const router = useRouter();
  const { account, activate, library, chainId } = useWeb3React();

  // const [isOwnNFT,setIsOwnNFT] = useState(data.contractAddress?  )

  const checkWalletBalance = async () => {
    // https://docs.ethers.io/v4/cookbook-accounts.html

    console.log({ library });

    console.log(library.network);

    if (chainId == 4 && library.connection.url != "metamask") {
      library.provider.http.connection.url = `https://rinkeby.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`;
    }

    const provider = await library.provider;
    const web3Provider = new providers.Web3Provider(provider);

    let balance = await web3Provider.getBalance(account);
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$", balance);

    console.log("FLOAT", parseFloat(data.ethAmount));

    console.log("FLOAT333333333333333", parseFloat(utils.formatEther(balance)));

    if (parseFloat(data.ethAmount) <= parseFloat(utils.formatEther(balance))) {
      console.log("Hell Yeh you can Register for premint you are a rich guy");
    } else console.log("BRO get Lost");

    console.log(account + ":" + utils.formatEther(balance));
  };

  const checkBalanceOf = async () => {
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

    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!", isContractExist);

    if (isContractExist === "0x") return;

    const response = await contract.balanceOf(account);

    if (parseInt(response)) {
      console.log("Fuck Yeh You own this NFT", parseInt(response));
    } else {
      console.log("Get the fuck of ", parseInt(response));
    }
  };

  useEffect(() => {
    const provider = localStorage.getItem("provider");
    if (provider) activate(connectors[provider]);
  }, [activate, router]);

  if (account) {
    if (data.ethAmount) {
      checkWalletBalance();
    } else {
      console.log("Project is not checking for ETH balance");
    }

    if (data.contractAddress) {
      checkBalanceOf();
    } else {
      console.log("Project is not checking for any NFT");
    }

    console.log("LOGGED IN");
    const projectsRef = collection(db, "users");
    const q = query(
      projectsRef,
      where("user", "==", account),
      where("projectId", "==", router.query.id)
    );

    getDocs(q)
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (Object.keys(doc.data()).length) {
            console.log("YES");
            console.log(doc.data());
            setIsShowRegintered(true);
          }
        });
      })
      .catch((err) => console.log(err));
  }

  const handleSubmit = async () => {
    setLoading(true);

    /*
      TODO: If project have requirement to check eth balance and own collection then we need check and call smart contract 
    */

    await addDoc(collection(db, `users`), {
      projectId: router.query.id,
      user: account,
      name: data.name,
      profileImage: data.profileImage,
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

      {account ? (
        <>
          {!isShowRegistered ? (
            <button onClick={handleSubmit}>Register</button>
          ) : (
            "ALREADY REGISTER"
          )}
        </>
      ) : (
        "PLEASE CONNTECT WAllET"
      )}

      {loading && "Registering.................."}
    </div>
  );
};

export default UserRegister;