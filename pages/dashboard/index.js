import { useEffect, useState, useRef } from "react";
import { useWeb3React } from "@web3-react/core";
import { connectors } from "../../src/utils/connectors";
import { useRouter } from "next/router";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, storage } from "../../src/utils/firebase";
import { async } from "@firebase/util";


export default function DashboardPage() {
    const userAccount = useRef();

    const { account, activate } = useWeb3React();

    // const [userAccount, setUserAccount] = useState();

    const [data, setData] = useState([])

    const router = useRouter();

    useEffect(() => {
        const provider = localStorage.getItem("provider");
        activate(connectors[provider], () => {
            console.log("error")
            router.push("/")
        })



    }, [activate, router])

    let projects = [];

    const getData = async () => {
        console.log("Getting data...........");
        try {
            const projectsRef = collection(db, "projects");
            const q = query(projectsRef, where("user", "==", account));
            const snapshot = await getDocs(q);
            snapshot.forEach((doc) => {
                if (Object.keys(doc.data()).length) {
                    console.log("YES")
                    console.log(doc.data())
                    let obj = { id: doc.id, ...doc.data() };
                    projects.push(obj);
                }
            })
            console.log("Finished getting data")
        }
        catch (error) {

            console.log("Error in fetch data", error)

        }

    }



    if (account) {
        userAccount.current = account;
    }

    if (userAccount.current) {
        console.log("DASHBOAD USER LOGGED IN");
        const projectsRef = collection(db, "projects");
        const q = query(projectsRef, where("user", "==", userAccount.current));
        // getData().then((message)=>{
        //     console.log("Message")
        // });
        // console.log("DONEEEEEEEEEEEEEEEEEEEe")


        getDocs(q)
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    if (Object.keys(doc.data()).length) {
                        console.log("YES")
                        // console.log(doc.data())
                        let obj = { id: doc.id, ...doc.data() };
                        projects.push(obj);
                    }
                })
                console.log(projects)
            }).catch(err => console.log(err));



        console.log(projects.length)
        // setData(projects)

    }

    // setData(projects);



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


    // if (account) {
    //     console.log("LOGGED IN")
    //     const projectsRef = collection(db, "users");
    //     const q = query(projectsRef, where("user", "==", account));

    //     const projects = []

    //     getDocs(q)
    //         .then((snapshot) => {
    //             snapshot.forEach((doc) => {
    //                 if (Object.keys(doc.data()).length) {
    //                     console.log("MASTER ANISH")
    //                     console.log(doc.data())
    //                     projects.push({ id: doc.id, ...doc.data() })

    //                 }
    //             })

    //             // snapshot.forEach((doc) => {
    //             //     console.log({ id: doc.id, ...doc.data() })
    //             // })



    //         }).catch(err => console.log(err));

    //     setData(projects)


    // }








    return (
        <div>
            Dashboard -
            {
                data.length > 0 ? "YES DATA" : "NO DATA"
            }


        </div>

    )
}


