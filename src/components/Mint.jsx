import { useContext, useState } from "react";
import { providers, Contract, utils } from "ethers";
import toast from "react-hot-toast";

import { UserContext } from "../context/UserContext";
import { allowlistABI } from "../smartContract/allowlistABI";
import { ALLOWLIST_CONTRACT, } from "../utils/constants";
import { RPC_NETWORK_URLS } from "../utils/connectors";


const Mint = () => {
  const { library, chainId } = useContext(UserContext);

  const [minting, setMinting] = useState(false);

  const mintNFT = async () => {
    setMinting(true);

    if (library.connection.url !== "metamask") {
      console.log({ chainId })
      library.provider.http.connection.url = RPC_NETWORK_URLS[chainId];
    }


    const provider = await library.provider;
    const web3Provider = new providers.Web3Provider(provider);

    const contract = new Contract(
      ALLOWLIST_CONTRACT,
      allowlistABI,
      web3Provider.getSigner()
    );

    const tx = await contract.mint(1, {
      value: utils.parseEther("0"),
    });

    await tx.wait()
      .then((res) => {
        setMinting(false);
        toast.success('You have successfully minted an Allowlist NFT')
      }).catch((error) => {
        console.log(error)
        toast.error('Something went wrong')
      })
  };

  return (
    <div className="mt-8 p-4 max-w-md mx-auto shadow-md rounded-sm  bg-gray-200">
      {!minting ? <button onClick={mintNFT}>Mint</button> : "Minting......."}
    </div>
  );
};

export default Mint;
