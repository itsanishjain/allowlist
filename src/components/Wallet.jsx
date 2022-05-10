import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

import { connectors } from "../utils/connectors";
import { truncateAddress } from "../utils/helpers";

const Wallet = () => {
  const { account, activate, deactivate, active } = useWeb3React();

  const connectMetaMask = async () => {
    let isCancelled = false;
    await activate(connectors.injected, () => {
      alert("Connection Rejected");
      isCancelled = true;
    });

    if (isCancelled) return;

    setProvider("injected");
    alert("Connected Successfully");
  };

  const connectWalletConnect = async () => {
    let isCancelled = false;
    await activate(connectors.walletConnect, () => {
      alert("Connection Rejected");
      isCancelled = true;
    });

    if (isCancelled) return;

    setProvider("walletConnect");
    alert("Connected Successfully");
  };

  const setProvider = (type) => localStorage.setItem("provider", type);

  const refreshState = () => localStorage.removeItem("provider");

  const disconnect = () => {
    refreshState();
    deactivate();
  };

  useEffect(() => {
    const provider = localStorage.getItem("provider");
    if (provider) activate(connectors[provider]);
  }, [activate]);

  return (
    <div className='space-y-10'>
      Wallet
      <br />
      {!account ? (
        <>
          <button onClick={connectMetaMask}>MetaMask</button>
          <br />
          <button onClick={connectWalletConnect}>WalletConnect</button>
        </>
      ) : (
        <>
          {active ? "YES" : "NOooooooo"}
          <p>{truncateAddress(account)}</p>
          <button onClick={disconnect}>Diconnect</button>
        </>
      )}
    </div>
  );
};

export default Wallet;
