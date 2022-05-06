import { useEffect, useState } from 'react'
import Wallet from '../components/Wallet'
import { useWeb3React } from "@web3-react/core";
import { connectors } from '../utils/connectors';

import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db, storage } from "../utils/firebase";

import { useRouter } from 'next/router';
import { async } from '@firebase/util';

import { Contract, providers, utils } from "ethers";

import { abi } from '../smartContract';




export default function UserRegister({ data }) {

    console.log({ data })

    const [loading, setLoading] = useState(false);

    const [isShowRegistered, setIsShowRegintered] = useState(false);

    const router = useRouter()
    const { account, activate, deactivate, active, library, chainId } = useWeb3React();

    // const [isOwnNFT,setIsOwnNFT] = useState(data.contractAddress?  )


    const checkBalanceOf = async () => {

        if (chainId == 4 && library.connection.url != 'metamask') {
            library.provider.http.connection.url = `https://rinkeby.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`
        }


        const provider = await library.provider;
        const web3Provider = new providers.Web3Provider(provider);

        const contract = new Contract(data.contractAddress, abi, web3Provider.getSigner());
        const response = await contract.balanceOf(account);

        if (parseInt(response)) {
            console.log("Fuck Yeh You own this NFT", parseInt(response))
        }
        else {
            console.log("Get the fuck of ", parseInt(response))
        }


    };





    useEffect(() => {
        const provider = window.localStorage.getItem("provider");
        if (provider) activate(connectors[provider]);
    }, [activate, router]);






    if (account) {

        if (data.contractAddress) {
            checkBalanceOf()
        }
        else {
            console.log("Project is not checking for any NFT")
        }

        console.log("LOGGED IN")
        const projectsRef = collection(db, "users");
        const q = query(projectsRef, where("user", "==", account,), where("projectId", "==", router.query.id));


        getDocs(q)
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    if (Object.keys(doc.data()).length) {
                        console.log("YES")
                        console.log(doc.data())
                        setIsShowRegintered(true)
                    }
                })

                // snapshot.forEach((doc) => {
                //     console.log({ id: doc.id, ...doc.data() })
                // })



            })
            .catch(err => console.log(err));
    }




    const handleSubmit = async () => {
        setLoading(true);
        try {

            /*
            
            TODO: If project have rquirement to check eth balance and own collection then we need check  and call smart contract 
            
            */
            const response = await addDoc(collection(db, `users`), {
                projectId: router.query.id,
                user: account,
                name: data.name,
                profileImage: data.profileImage
            })
            console.log({ response })
            console.log(response.id)
            console.log("DONE")
            // router.push(`/dashboard/${response.id}/settings`)
        }
        catch (error) {
            console.log("ERROR in Registering form", error)
        }

        setLoading(false)
    }

    return (
        <div>
            <p>{data.name}</p>
            <p>{data.description}</p>

            <p>REGISTER PAGE</p>
            <Wallet />

            {
                account ? (
                    <>
                        {
                            !isShowRegistered ? <button onClick={handleSubmit}>Register</button> : "ALREADY REGISTER"
                        }
                    </>
                ) : "PLEASE CONNTECT WAllET"


            }

            {
                loading && "Registering.................."
            }



        </div>
    )
}
