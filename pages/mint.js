import { useContext, useState } from "react";
import { providers, Contract, utils } from "ethers";

import { UserContext } from "../src/context/UserContext";
import { allowlistABI } from "../src/smartContract/allowlistABI";
import { ALLOWLIST_CONTRACT, INFURA_RINKEBY_URL } from "../src/utils/constants";

const MintPage = () => {
  const { library, chainId } = useContext(UserContext);

  const [minting, setMinting] = useState(false);

  const mintNFT = async () => {
    setMinting(true);

    try {
      if (chainId == 4 && library.connection.url != "metamask") {
        library.provider.http.connection.url = INFURA_RINKEBY_URL;
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

      await tx.wait();
      setMinting(false);

      alert("You Successfully Minted an NFT");
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  return (
    <div>
      {!minting ? <button onClick={mintNFT}>Mint</button> : "Minting......."}

      {library ? "YES" : "Noooooooo"}
    </div>
  );
};

export default MintPage;
