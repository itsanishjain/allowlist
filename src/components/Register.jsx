import { useEffect, useState } from 'react'
import Wallet from '../components/Wallet'
import { useWeb3React } from "@web3-react/core";
import { connectors } from '../utils/connectors';

import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db, storage } from "../utils/firebase";

import { useRouter } from 'next/router';
import { async } from '@firebase/util';




export default function UserRegister({ data }) {

    console.log({ data })

    const [loading, setLoading] = useState(false);

    const [isShowRegistered, setIsShowRegintered] = useState(false);

    const router = useRouter()
    const { account, activate, deactivate, active } = useWeb3React();

    useEffect(() => {
        const provider = window.localStorage.getItem("provider");
        if (provider) activate(connectors[provider]);
    }, [activate]);


    console.log(router.query.id, "DFSDFDFDSFSDF")

    if (account) {
        console.log("LOGGED IN")
        const projectsRef = collection(db, "users");
        const q = query(projectsRef, where(
            "user", "==", account,

        ), where(

            "projectId", "==", router.query.id
        ));

        // const q2 = query(projectsRef, where(

        //     "projectId", "==", router.query.id
        // ));

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
