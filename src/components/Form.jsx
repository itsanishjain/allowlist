import { useState, useEffect, useContext } from "react";
import toast from 'react-hot-toast';

import { useRouter } from "next/router";
import { doc, setDoc, collection } from "firebase/firestore";

import { db } from "../utils/firebase";
import { uploadFile } from "../utils/helpers";
import { UserContext } from "../context/UserContext";
import Input from "./Input";
import Loader from "./Loader";

const Form = () => {
  const { account, isLoggedIn } = useContext(UserContext);

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
      .then(() => {
        toast.success("Project Created Successfully")
        router.push(`/dashboard/${docID}/settings`)
      })
      .catch((error) => {

        toast.error("Error :(")
      });

    setLoading(false);
  };

  useEffect(() => {
    if (!isLoggedIn) return router.push("/login");
  }, [isLoggedIn, router]);

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
        required={true}
      />

      <Input
        inputTagType='largeInput'
        placeholder='Description'
        onChange={handleChange}
        value={formValues.description}
        name='description'
        required={true}
      />

      <p>Profile Image</p>
      <input
        name='profileImage'
        onChange={handleImageChange}
        accept='image/*'
        type='file'
        required={true}
      />

      <img src={formValues.profileImage} />

      <p>Banner Image</p>
      <input
        name='bannerImage'
        onChange={handleImageChange}
        accept='image/*'
        type='file'
        required={true}
      />
      <img src={formValues.bannerImage} />

      {loading ? (
        <Loader />
      ) : (
        <button>Create</button>
      )}
    </form>
  );
};

export default Form;
