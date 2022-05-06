import { useState } from 'react'
import { addDoc, updateDoc, collection, doc } from "firebase/firestore";
import { db } from '../utils/firebase';

export default function WalletRequirement({ data }) {
    console.log("Data inside wallet requirement page", data)
    const [formValues, setFormValues] = useState({
        ethAmount: "",
        contractAddress: "",
        contractName: "",
        marketPlaceUrl: ""
    });

    const handleChange = (e) => {
        setFormValues((prevValues) => (
            { ...prevValues, [e.target.name]: e.target.value }
        ))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("adding wallet requiremtnts");
        try {
            const response = await updateDoc(doc(db, "projects", data.id), { ...formValues })
            console.log(response,"RESPONSE")
        }
        catch (error) {
            console.log("ERROR", error)
        }

    }

    return (
        <div>

            <p>WalletRequirement</p>

            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} value={formValues.ethAmount} type="text" placeholder="ETH required" name="ethAmount" />
                <input onChange={handleChange} value={formValues.contractAddress} type="text" placeholder='contract address' name="contractAddress" />
                <input onChange={handleChange} value={formValues.contractName} type="text" placeholder='contract Name' name='contractName' />
                <input onChange={handleChange} value={formValues.marketPlaceUrl} type="text" placeholder='contract Open sea url' name="marketPlaceUrl" />

                <button>save Settings</button>
            </form>






        </div>
    )
}
