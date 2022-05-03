import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { connectors } from "../../src/utils/connectors";
import { useRouter } from "next/router";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, storage } from "../../src/utils/firebase";


export default function Dashboard() {
    const { account, activate } = useWeb3React();

    const [userAccount, setUserAccount] = useState();

    // const [data, setData] = useState()

    const router = useRouter();

    // useEffect(() => {
    //     const provider = localStorage.getItem("provider");
    //     activate(connectors[provider], () => {
    //         console.log("error")
    //         router.push("/")
    //     })



        //     console.log("######################", account)

        //     if (account) {
        //         console.log(account, typeof account, ">>>>>>>>>>>>>>>>>")
        //         const projectsRef = collection(db, "projects");

        //         const q = query(projectsRef, where("user", "==", account));

        //         getDocs(q)
        //             .then(snapshot => snapshot.forEach(doc => {
        //                 console.log({ id: doc.id, ...doc.data() })
        //                 let d = { id: doc.id, ...doc.data() }
        //                 setData(d)
        //             }))
        //             .catch(err => console.log(err));
        //     }


    // }, []);


    // console.log("Account", userAccount);
    // let data = [];
    // const projectsRef = collection(db, "projects");
    // if (account) {
    //     const q = query(projectsRef, where("user", "==", account));
    //     console.log("DONEE")

    //     getDocs(q)
    //         .then(snapshot => snapshot.forEach(doc => {
    //             console.log({ id: doc.id, ...doc.data() })
    //             let d = { id: doc.id, ...doc.data() }
    //             data.push(d)

    //             // console.log(data)
    //             // setData(d)
    //         }))
    //         .catch(err => console.log(err));

    // }

    return (
        <div>
            Dashboard
        </div>

    )
}


