import React, { createContext, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

import { connectors } from "../utils/connectors";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const { account, activate } = useWeb3React();

  useEffect(() => {
    activate(connectors[localStorage.getItem("provider")]);
  }, [activate]);

  return (
    <UserContext.Provider value={{ user: account, isLoggedIn: !!account }}>
      {children}
    </UserContext.Provider>
  );
};
