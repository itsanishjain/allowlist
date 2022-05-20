import { useState } from "react";
import { updateDoc, doc } from "firebase/firestore";

import { db } from "../utils/firebase";
import Input from "./Input";
import Loader from "./Loader";

const WalletRequirement = ({ data }) => {
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    console.log("adding wallet requirements");

    await updateDoc(doc(db, "projects", data.id), formValues)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='mt-8 max-w-md mx-auto flex flex-col space-y-4 p-8 shadow-md rounded-sm'>
      <Input
        name='ethAmount'
        placeholder='ETH Amount'
        onChange={handleChange}
        value={formValues.ethAmount}
        inputTagType='smallInput'
      />

      <Input
        name='contractAddress'
        placeholder='Contract Address'
        onChange={handleChange}
        value={formValues.contractAddress}
        inputTagType='smallInput'
      />

      <Input
        name='contractName'
        placeholder='Contract Name'
        onChange={handleChange}
        value={formValues.contractName}
        inputTagType='smallInput'
      />

      <Input
        name='marketPlaceUrl'
        placeholder='Market Place URL'
        onChange={handleChange}
        value={formValues.marketPlaceUrl}
        inputTagType='smallInput'
      />
      {loading ? <Loader /> : <button className='p-4 w-full'>Save</button>}
    </form>
  );
};

export default WalletRequirement;
