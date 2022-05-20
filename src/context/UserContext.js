import React, { createContext, useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Contract, providers } from "ethers";

import { abi } from "../smartContract";
import { connectors } from "../utils/connectors";
import { ALLOWLIST_CONTRACT, INFURA_RINKEBY_URL } from "../utils/constants";
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

  const isUserOwnAllowlistNFT = async (currentUserAccount) => {
    if (chainId == 4 && library.connection.url != "metamask") {
      library.provider.http.connection.url = INFURA_RINKEBY_URL;
    }

    const provider = await library.provider;
    const web3Provider = new providers.Web3Provider(provider);

    const contract = new Contract(
      ALLOWLIST_CONTRACT,
      abi,
      web3Provider.getSigner()
    );

    const isContractExist = await web3Provider.getCode(ALLOWLIST_CONTRACT);

    if (isContractExist === "0x") {
      console.log(
        `Allowlist NFT Contract does not exist in this chain ${chainId}`
      );
      return;
    }
    const response = await contract.balanceOf(currentUserAccount);
    return parseInt(response) !== 0;
  };

  useEffect(() => {
    activate(connectors[localStorage.getItem("provider")]).then(() => {
      setIsLoading(false);
    });
  }, [activate]);

  useEffect(() => {
    if (!account) return;
    isUserOwnAllowlistNFT(account).then((res) => setIsAllowlistActivated(res));
  }, [account]);

  return (
    <UserContext.Provider
      value={{
        activate,
        deactivate,
        library,
        disconnect,
        isUserOwnAllowlistNFT,
        user: account,
        isLoggedIn: !!account,
        isAllowlistActivated,
        chainId,
      }}>
      {isLoading ? <Loader /> : children}
    </UserContext.Provider>
  );
};
