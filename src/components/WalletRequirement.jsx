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
      <p className="mt-1 text-purple-600 ml-[650px]">
        - Wallet <cite>Requirements</cite>
      </p>

      <form onSubmit={handleSubmit} classNameName="flex flex-col items-center">
        <input
          onChange={handleChange}
          value={formValues.ethAmount}
          type="text"
          placeholder="ETH required"
          name="ethAmount"
          classNameName="p-2 bg-gray-400 text-black focus:text-white focus:bg-black placeholder:text-white mt-2 w-2/12"
        />
        <input
          onChange={handleChange}
          value={formValues.contractAddress}
          type="text"
          placeholder="contract address"
          classNameName="p-2 bg-gray-400 text-black focus:text-white focus:bg-black placeholder:text-white mt-2 w-2/12"
          name="contractAddress"
        />
        <input
          onChange={handleChange}
          value={formValues.contractName}
          type="text"
          placeholder="contract Name"
          classNameName="p-2 bg-gray-400 text-black focus:text-white focus:bg-black placeholder:text-white mt-2 w-2/12"
          name="contractName"
        />
        <input
          onChange={handleChange}
          value={formValues.marketPlaceUrl}
          type="text"
          placeholder="contract Open sea url"
          classNameName="p-2 bg-gray-400 text-black focus:text-white focus:bg-black placeholder:text-white mt-2 w-2/12"
          name="marketPlaceUrl"
        />

        <button>save Settings</button>
      </form>
    </div>
  );
};

export default WalletRequirement;
