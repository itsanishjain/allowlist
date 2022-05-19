import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext';
import { providers, Contract } from 'ethers';


const Mint = () => {
    const { library, chainId } = useContext(UserContext);

    const [minting, setMinting] = useState(false)

    const mintNFT = async () => {
        console.log({ library }, "LLLLLLLLLLLLLLLLLLLLLLL")
        try {
            if (chainId == 4 && library.connection.url != 'metamask') {
                library.provider.http.connection.url = `https://rinkeby.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`
            }

            const provider = await library.provider;
            const web3Provider = new providers.Web3Provider(provider);

            const contract = new Contract(contractAddress, abi, web3Provider.getSigner());
            const tx = await contract.mint({
                value: utils.parseEther("0.001"),
            });
            setMinting(true);
            await tx.wait();
            setMinting(false);

            alert("You Successfully Minted an NFT")
        } catch (err) {
            console.log(err)
            alert("Something went wrong")
        }
    };

    return (
        <div>

            {
                !minting ? <button onClick={mintNFT}>Mint</button> : "Minting......."
            }

            {library ? "YES": "Noooooooo"}


        </div>
    )
}

export default Mint