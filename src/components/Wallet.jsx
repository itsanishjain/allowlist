import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { connectors } from '../utils/connectors';
import { truncateAddress } from '../utils/helpers';


export default function Wallet() {

    const { account, activate, deactivate, active } = useWeb3React();




    const connectMetaMask = async () => {
        let isCancelled = false;
        await activate(connectors.injected, () => {
            window.alert("Connection Rejected");
            isCancelled = true;
        });

        if (!isCancelled) {
            setProvider("injected");
            window.alert("Connected Successfully");
        }
    }

    const connectWalletConnect = async () => {
        let isCancelled = false;
        await activate(connectors.walletConnect, () => {
            window.alert("Connection Rejected");
            isCancelled = true;
        });

        if (!isCancelled) {
            setProvider("walletConnect");
            window.alert("Connected Successfully");
        }
    }

    // Set MM/walletConnect provider in localStorage
    const setProvider = (type) => { window.localStorage.setItem("provider", type) };

    // Unset MM/walletConnect provider in localStorage
    const refreshState = () => { window.localStorage.removeItem("provider") };

    const disconnect = () => {
        refreshState();
        deactivate();
    };

    useEffect(() => {
        const provider = window.localStorage.getItem("provider");
        if (provider) activate(connectors[provider]);
    }, [activate]);


    return (
        <div>
            Wallet
            <br />
            {
                !account ? (
                    <>
                        <button onClick={connectMetaMask}>MetaMask</button>
                        <br />
                        <button onClick={connectWalletConnect}>WalletConnect</button>
                    </>
                ) :
                    (
                        <>
                            {active ? "YES" : "NOooooooo"}
                            <p>{truncateAddress(account)}</p>
                            <button onClick={disconnect}>Diconnect</button>
                        </>
                    )
            }
        </div>
    )
}
