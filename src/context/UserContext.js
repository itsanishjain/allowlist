import React, { createContext, useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Contract, providers } from "ethers";

import { abi } from "../smartContract";
import { connectors, RPC_NETWORK_URLS } from "../utils/connectors";
import { ALLOWLIST_CONTRACT } from "../utils/constants";
import Loader from "../components/Loader";

export const UserContext = createContext();



export const UserContextProvider = ({ children }) => {
  const { account, activate, deactivate, chainId, library } = useWeb3React();

  const [isLoading, setIsLoading] = useState(true);
  const [isAllowlistActivated, setIsAllowlistActivated] = useState(false);

  const disconnect = () => {
    localStorage.removeItem("provider");
    deactivate();
  };

  const isNFTOwned = async (currentUserAccount, contractAddress) => {

    // console.log('user context', { library })

    console.log({ chainId })

    if (library.connection.url !== "metamask") {
      console.log({ chainId })
      library.provider.http.connection.url = RPC_NETWORK_URLS[chainId];
    }

    const provider = await library.provider;
    const web3Provider = new providers.Web3Provider(provider);

    const contract = new Contract(
      contractAddress,
      abi,
      web3Provider.getSigner()
    );

    console.log({ contractAddress })
    const isContractExist = await web3Provider.getCode(contractAddress);

    console.log({ isContractExist })

    if (isContractExist === "0x") {
      console.log(`NFT Contract  not exist in this chain ${chainId}`);
      return false;
    }
    // const response = await contract.balanceOf(currentUserAccount);
    return await contract.balanceOf(currentUserAccount)
      .then((res) => parseInt(res) !== 0)
      .catch((err) => false)
  };


  useEffect(() => {
    activate(connectors[localStorage.getItem("provider")]).then(() => {
      setIsLoading(false);
    });
  }, [activate]);

  useEffect(() => {
    if (!account) return;
    isNFTOwned(account, ALLOWLIST_CONTRACT).then((res) =>

      // setIsAllowlistActivated(res));

      console.log("TTTTTTTTTTTTTTTTtt", res))
  }, [account, library]);

  return (
    <UserContext.Provider
      value={{
        activate,
        deactivate,
        library,
        disconnect,
        isNFTOwned,
        account,
        isLoggedIn: !!account,
        isAllowlistActivated,
        chainId,
      }}>
      {isLoading ? <Loader /> : children}
    </UserContext.Provider>
  );
};
