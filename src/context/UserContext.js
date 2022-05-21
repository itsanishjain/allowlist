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
  const [allowlistNFT, setAllowlistNFT] = useState({
    isActivated: false,
    hasErrors: false,
  });

  const disconnect = () => {
    localStorage.removeItem("provider");
    deactivate();
  };

  const isNFTOwned = async (currentUserAccount, contractAddress) => {
    console.log({ chainId });

    if (library.connection.url !== "metamask") {
      library.provider.http.connection.url = RPC_NETWORK_URLS[chainId];
    }

    const provider = await library.provider;
    const web3Provider = new providers.Web3Provider(provider);

    const contract = new Contract(
      contractAddress,
      abi,
      web3Provider.getSigner()
    );

    const contractCode = await web3Provider.getCode(contractAddress);

    console.log({ contractAddress });
    console.log({ contractCode });

    if (contractCode === "0x") {
      console.log(`NFT Contract does not exist in this chain: ${chainId}`);
      return { isActivated: false, hasErrors: false };
    }

    return await contract
      .balanceOf(currentUserAccount)
      .then((res) => ({ isActivated: parseInt(res) !== 0, hasErrors: false }))
      .catch(() => ({ isActivated: false, hasErrors: true }));
  };

  useEffect(() => {
    activate(connectors[localStorage.getItem("provider")]).then(() => {
      setIsLoading(false);
    });
  }, [activate]);

  useEffect(() => {
    if (!account) return;

    isNFTOwned(account, ALLOWLIST_CONTRACT).then((res) => setAllowlistNFT(res));
  }, [account, library]);

  return (
    <UserContext.Provider
      value={{
        account,
        chainId,
        library,
        activate,
        disconnect,
        deactivate,
        isNFTOwned,
        allowlistNFT,
        isLoggedIn: !!account,
      }}>
      {isLoading ? <Loader /> : children}
    </UserContext.Provider>
  );
};
