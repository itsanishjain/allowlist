import { useState } from "react";
import { updateDoc, doc } from "firebase/firestore";

import { db } from "../utils/firebase";

const WalletRequirement = ({ data }) => {
  const [formValues, setFormValues] = useState({
    ethAmount: data.ethAmount ? data.ethAmount : "",
    contractAddress: data.contractAddress ? data.contractAddress : "",
    contractName: data.contractName ? data.contractName : "",
    marketPlaceUrl: data.marketPlaceUrl ? data.marketPlaceUrl : "",
  });

  const handleChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("adding wallet requirements");

    await updateDoc(doc(db, "projects", data.id), formValues)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <p>WalletRequirement</p>

      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={formValues.ethAmount}
          type='text'
          placeholder='ETH required'
          name='ethAmount'
        />
        <br />
        <input
          onChange={handleChange}
          value={formValues.contractAddress}
          type='text'
          placeholder='contract address'
          name='contractAddress'
        />
        <br />
        <input
          onChange={handleChange}
          value={formValues.contractName}
          type='text'
          placeholder='contract Name'
          name='contractName'
        />
        <br />
        <input
          onChange={handleChange}
          value={formValues.marketPlaceUrl}
          type='text'
          placeholder='contract Open sea url'
          name='marketPlaceUrl'
        />

        <button>save Settings</button>
      </form>
    </div>
  );
};

export default WalletRequirement;
