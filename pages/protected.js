import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { connectors } from "../src/utils/connectors";
import { useRouter } from "next/router";


export default function Protected() {

    // NOTE: this is not secure 
    const { account, activate } = useWeb3React();

    const router = useRouter();

    useEffect(() => {
        const provider = window.localStorage.getItem("provider");
        console.log({ provider })
        if (provider) {
            activate(connectors[provider])
        }
        else {
            console.log("HERE YOU END")
            router.push("/")
        }
    }, [activate]);


    return (
        <div>
            Protected Page
        </div>
    )
}
