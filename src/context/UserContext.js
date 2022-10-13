import React, { createContext, useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Contract, providers } from "ethers";

import { abi } from "../smartContract";
import { connectors, uauth } from "../utils/connectors";
import { ALLOWLIST_CONTRACT } from "../utils/constants";
import Loader from "../components/Loader";

export const UserContext = createContext();

import {
  INFURA_MAINNET_URL,
  INFURA_ROPSTEN_URL,
  INFURA_RINKEBY_URL,
  ALCHEMY_POLYGON_MAINNET_URL,
  ALCHEMY_POLYGON_MUMBAI_URL,
} from "../utils/constants";

const RPC_NETWORK_URLS = {
  1: INFURA_MAINNET_URL,
  3: INFURA_ROPSTEN_URL,
  4: INFURA_RINKEBY_URL,
  137: ALCHEMY_POLYGON_MAINNET_URL,
  80001: ALCHEMY_POLYGON_MUMBAI_URL,
};

export const UserContextProvider = ({ children }) => {
  const { account, activate, deactivate, chainId, library } = useWeb3React();

  const [UD, setUD] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const [allowlistNFT, setAllowlistNFT] = useState({
    isActivated: false,
    isChainIdWrong: false,
  });

  const disconnect = () => {
    localStorage.removeItem("provider");
    setUD();
    deactivate();
  };

  const getUD = () => {
    uauth.uauth
      .user()
      .then((res) => {
        setUD(res.sub);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isNFTOwned = async (
    currentUserAccount,
    contractAddress,
    checkChainId = true
  ) => {
    console.log({ chainId });

    // if (checkChainId && chainId !== 80001 && chainId !== 137)
    if (checkChainId && chainId !== 137)
      return {
        isActivated: false,
        isChainIdWrong: true,
      };

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

    // This might return true for different chains as well
    if (contractCode === "0x") {
      console.log(`NFT Contract does not exist in this chain: ${chainId}`);
      return { isActivated: false, isChainIdWrong: false };
    }

    return await contract
      .balanceOf(currentUserAccount)
      .then((res) => ({
        isActivated: parseInt(res) !== 0,
        isChainIdWrong: false,
      }))
      .catch(() => ({ isActivated: false, isChainIdWrong: true }));
  };

  useEffect(() => {
    let walletName = localStorage.getItem("provider");
    activate(connectors[walletName]).then(() => {
      if (walletName === "uauth") getUD();
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
        UD,
        setUD,
        getUD,
      }}
    >
      {isLoading ? <Loader /> : children}
    </UserContext.Provider>
  );
};
