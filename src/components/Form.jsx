import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";
import { addDoc, collection } from "firebase/firestore";

import { db } from "../utils/firebase";
import { uploadFile } from "../utils/helpers";
import { connectors } from "../utils/connectors";
import Input from "./Input";

const Form = () => {
  const { account, activate } = useWeb3React();

  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
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
  });
  const [imageSrc, setImageSrc] = useState({
    profileImageSrc: null,
    bannerImageSrc: null,
  });

  const router = useRouter();

  const onImageChange = (e) => {
    const reader = new FileReader();
    reader.onload = function (onLoadEvent) {
      setImageSrc((prev) => ({
        ...prev,
        [e.target.name]: onLoadEvent.target.result,
      }));
    };
    reader.readAsDataURL(e.target.files[0]);
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.files[0],
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

    const image1 = await uploadFile(`projectsImage`, formValues.profileImage);

    const image2 = await uploadFile(`projectsImage`, formValues.bannerImage);

    await addDoc(collection(db, "projects"), {
      ...formValues,
      user: account,
      profileImage: image1,
      bannerImage: image2,
    })
      .then((res) => router.push(`/dashboard/${res.id}/settings`))
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

    <form className="flex flex-col max-w-xl mx-auto mt-4 space-y-4 p-2" onSubmit={handleSubmit}>
      {/* <input
        name='name'
        onChange={handleChange}
        value={formValues.name}
        type='text'
        placeholder='Project Name'
      /> */}

      <Input inputTagType="smallInput" placeholder="Name of your project" />


      {/* <textarea
        name='description'
        onChange={handleChange}
        value={formValues.description}
        type='text'
        placeholder='Description'
      /> */}

      <Input inputTagType="largeInput" placeholder="Description" />




      <p>Profile Image</p>
      <input
        name='profileImage'
        onChange={onImageChange}
        accept='image/*'
        type='file'
      />

      <img src={imageSrc.profileImage} />

      <p>Banner Image</p>
      <input
        name='bannerImage'
        onChange={onImageChange}
        accept='image/*'
        type='file'
      />
      <img src={imageSrc.bannerImage} />

      {!loading ? <button>Create</button> : "Creating......"}
    </form>
  );
};

export default Form;
