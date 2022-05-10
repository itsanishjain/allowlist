import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { connectors } from "../../src/utils/connectors";
import { useRouter } from "next/router";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../src/utils/firebase";
import Dashboard from "../../src/components/Dashboard";



export default function DashboardPage() {

    const { account, activate } = useWeb3React();

    const [data, setData] = useState([])

    const router = useRouter();

    useEffect(() => {
        const provider = localStorage.getItem("provider");
        activate(connectors[provider], () => {
            console.log("error")
            router.push("/")
        })
    }, [activate, router])


    useEffect(() => {
        if (!account) return;
        // If account exist 
        const projectsRef = collection(db, "projects");
        const q = query(projectsRef, where("user", "==", account));
        getDocs(q)
            .then((snapshot) => {
                setData(snapshot.docs.map(doc => (
                    { id: doc.id, ...doc.data() }
                )))

            }).catch(err => console.log(err));

    }, [account])

    console.log("DATA", data)
    return (
        <div>
            Dashboard -
            {
                data && data.length != 0 ?
                    (
                        data.map((d, index) => (
                            <Dashboard key={index} data={d} />
                        ))
                    )
                    : "NO DATA"
            }
        </div>

    )
}


