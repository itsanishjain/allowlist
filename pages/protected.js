import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/router";

import { connectors } from "../src/utils/connectors";

const Protected = () => {
  // NOTE: this is not secure
  const { account, activate } = useWeb3React();

  const router = useRouter();

  useEffect(() => {
    const provider = localStorage.getItem("provider");
    activate(connectors[provider], () => {
      console.log("error");
      router.push("/");
    });
  }, [activate, router]);

  return <div>Protected Page</div>;
};

export default Protected;
