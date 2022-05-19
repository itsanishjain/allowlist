import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { providers, Contract, utils } from "ethers";

import { allowlistABI } from "../smartContract/allowlistABI";

const ALLOWLIST_CONTRACT = "0xfdb45a71fa1761fb43d2d665a3e1cc4a31b10e4c";

const Mint = () => {
  const { library, chainId } = useContext(UserContext);

  const [minting, setMinting] = useState(false);

  const mintNFT = async () => {
    setMinting(true);
    try {
      if (chainId == 4 && library.connection.url != "metamask") {
        library.provider.http.connection.url = `https://rinkeby.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`;
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

export default Mint;
