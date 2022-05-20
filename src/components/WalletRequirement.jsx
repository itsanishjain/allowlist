import { useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import toast from 'react-hot-toast';

import { db } from "../utils/firebase";
import Input from "./Input";
import Loader from "./Loader";

const WalletRequirement = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [isWalletFormUpdated, setIsWalletFormUpdated] = useState(false);


  const [formValues, setFormValues] = useState({
    ethAmount: data?.ethAmount,
    contractAddress: data?.contractAddress,
    contractName: data?.contractName,
    marketPlaceUrl: data?.marketPlaceUrl
  });

  const handleChange = (e) => {
    setIsWalletFormUpdated(true)
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!isWalletFormUpdated) return


    // if (!formValues.ethAmount && !formValues.contractAddress && !formValues.contractName && !formValues.marketPlaceUrl) {
    //   alert("At least one field is required")
    //   return
    // }

    setLoading(true);

    await updateDoc(doc(db, "projects", data.id), formValues)
      .then(() => {
        setIsWalletFormUpdated(false)
        toast.success('Wallet requirements updateded')
      })
      .catch((err) => {
        console.log(err)
        toast.error('Error :(')
      });

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
        required={formValues.contractName !== ''}
      />

      <Input
        name='contractName'
        placeholder='Contract Name'
        onChange={handleChange}
        value={formValues.contractName}
        inputTagType='smallInput'
        required={formValues.contractAddress !== ''}
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
