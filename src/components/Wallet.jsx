import { useContext } from "react";
import toast from "react-hot-toast";

import { connectors } from "../utils/connectors";
import { truncateAddress } from "../utils/helpers";
import { UserContext } from "../context/UserContext";

const Wallet = () => {
  const { account, activate, disconnect, UD, getUD } = useContext(UserContext);

  const connectWallet = async (walletName) => {
    let isCancelled = false;
    await activate(connectors[walletName], () => {
      toast.error("Connection Rejected");
      isCancelled = true;
    }).then(() => {
      if (walletName === "uauth") getUD();
    });

    if (isCancelled) return;

    localStorage.setItem("provider", walletName);
    toast.success("Connected Successfully");
  };

  return (
    <div className="space-y-10 max-w-lg mx-auto  shadow-md rounded-md p-8 ">
      {!account ? (
        <div className="flex flex-col space-y-4">
          <button onClick={() => connectWallet("injected")}>MetaMask</button>
          <button onClick={() => connectWallet("walletConnect")}>
            WalletConnect
          </button>
          <button onClick={() => connectWallet("uauth")}>Unstoppable</button>
        </div>
      ) : (
        <>
          <p>{UD ? UD : truncateAddress(account)}</p>
          <button onClick={disconnect}>Disconnect</button>
        </>
      )}
    </div>
  );
};

export default Wallet;
