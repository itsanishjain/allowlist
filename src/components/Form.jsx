import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import axios from "axios";

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
        axios.post(`/api/project/create`, { account });
        toast.success("Project Created Successfully");
        router.push(`/dashboard/${docID}/settings`);
      })
      .catch((error) => toast.error("Error :("));

    setLoading(false);
  };

  useEffect(() => {
    if (!isLoggedIn) return router.push("/login");
  }, [isLoggedIn, router]);

  return (
    <form
      className='flex flex-col max-w-2xl mx-auto mt-4 space-y-8 p-4 bg-gray-50 shadow-md rounded-md'
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
        className='mt-3 block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer'
        required={true}
      />

      {formValues.profileImage && (
        <div className='w-full h-96 md:h-auto md:w-48'>
          <Image
            src={formValues.profileImage}
            alt='profile image'
            width='100%'
            height='100%'
            layout='responsive'
          />
        </div>
      )}

      <p>Banner Image</p>

      <input
        name='bannerImage'
        onChange={handleImageChange}
        accept='image/*'
        type='file'
        className='form-control mt-3 block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
        required={true}
      />
      {formValues.bannerImage && (
        <div className='w-full h-96 md:h-auto md:w-48'>
          <Image
            src={formValues.bannerImage}
            alt='profile image'
            width='100%'
            height='100%'
            layout='responsive'
          />
        </div>
      )}

      {loading ? <Loader /> : <button>Create</button>}
    </form>
  );
};

export default Form;
