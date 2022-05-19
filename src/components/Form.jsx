import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";
import { doc, setDoc, collection } from "firebase/firestore";

import { db } from "../utils/firebase";
import { uploadFile } from "../utils/helpers";
import { connectors } from "../utils/connectors";
import Input from "./Input";

const Form = () => {
  const { account, activate } = useWeb3React();

  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    creator: account,
    name: "",
    description: "",
    profileImage: "",
    bannerImage: "",
    link: "",
    isPrivate: "",
    mintDate: "",
    mintTime: "",
    mintAvailableSpots: "",
    mintPrice: "",
    users: [],
    ethAmount: "",
    contractAddress: "",
    contractName: "",
    marketPlaceUrl: "",
  });

  const [imageFiles, setImageFiles] = useState({
    profileImageFile: null,
    bannerImageFile: null,
  });

  const router = useRouter();

  const handleImageChange = (e) => {
    setImageFiles((prev) => ({
      ...prev,
      [e.target.name + "File"]: e.target.files[0],
    }));

    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: URL.createObjectURL(e.target.files[0]),
    }));
  };

  const handleChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const docRef = doc(collection(db, "projects"));
    const docID = docRef.id;

    const image1 = await uploadFile(
      `projects/${docID}`,
      imageFiles.profileImageFile,
      "profileImage"
    );

    const image2 = await uploadFile(
      `projects/${docID}`,
      imageFiles.bannerImageFile,
      "bannerImage"
    );

    await setDoc(docRef, {
      ...formValues,
      profileImage: image1,
      bannerImage: image2,
    })
      .then(() => router.push(`/dashboard/${docID}/settings`))
      .catch((err) => console.log(err));

    setLoading(false);
  };

  useEffect(() => {
    const provider = localStorage.getItem("provider");
    activate(connectors[provider], () => {
      console.log("error");
      router.push("/");
    });
  }, [activate, router]);

  return (
    <form
      className='flex flex-col max-w-xl mx-auto mt-4 space-y-4 p-2'
      onSubmit={handleSubmit}>
      <Input
        inputTagType='smallInput'
        placeholder='Name of your project'
        onChange={handleChange}
        value={formValues.name}
        name='name'
      />

      <Input
        inputTagType='largeInput'
        placeholder='Description'
        onChange={handleChange}
        value={formValues.description}
        name='description'
      />

      <p>Profile Image</p>
      <input
        name='profileImage'
        onChange={handleImageChange}
        accept='image/*'
        type='file'
      />

      <img src={formValues.profileImage} />

      <p>Banner Image</p>
      <input
        name='bannerImage'
        onChange={handleImageChange}
        accept='image/*'
        type='file'
      />
      <img src={formValues.bannerImage} />

      {!loading ? (
        <button>Create</button>
      ) : (
        <button disabled>Creating......</button>
      )}
    </form>
  );
};

export default Form;
