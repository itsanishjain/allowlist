import React, { createContext, useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { connectors } from "../utils/connectors";
import { Contract, providers, utils } from "ethers";
import { abi } from "../smartContract";
import Loader from '../components/Loader'


const ALLOWLIST_CONTRACT = "0xfdb45a71fa1761fb43d2d665a3e1cc4a31b10e4c"

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const { account, activate, deactivate, chainId, library } = useWeb3React();

  const [isLoading, setIsLoading] = useState(true);
  const [isAllowlistActivated, setIsAllowlistActivated] = useState(false);

  const disconnect = () => {
    localStorage.removeItem("provider")
    deactivate();
  };

  const isUserOwnAllowlistNFT = async (currentUserAccount) => {
    if (chainId == 4 && library.connection.url != "metamask") {
      library.provider.http.connection.url = `https://rinkeby.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`;
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
      console.log("Contract not exist in this chain")
      return
    };
    const response = await contract.balanceOf(currentUserAccount);
    return parseInt(response) !== 0;
  };

  useEffect(() => {
    activate(connectors[localStorage.getItem("provider")]).then(() => {
      setIsLoading(false)
    });

  }, [activate]);

  useEffect(() => {
    if (!account) return;
    isUserOwnAllowlistNFT(account).then((res) => {
      setIsAllowlistActivated(res)
    })
  }, [account])


  return (
    <UserContext.Provider value=
      {
        {
          activate,
          deactivate,
          library,
          disconnect,
          isUserOwnAllowlistNFT,
          user: account,
          isLoggedIn: !!account,
          isAllowlistActivated
        }
      }>
      {
        isLoading ? <Loader /> : children
      }
    </UserContext.Provider>
  );
};
