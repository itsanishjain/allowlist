import React, { useState } from "react";
import Image from "next/image";
import { uploadFile } from "../utils/helpers";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../utils/firebase";


const ProjectInfo = ({ data }) => {
  const [project, setProject] = useState({
    name: data.name,
    description: data.description,
    profileImage: "",
    bannerImage: "",
    slug: "",
    link: "",
    isPrivate: true,
    mintDate: "",
    mintTime: "",
    mintAvailableSpots: "",
    mintPrice: "",
  });

  const [imageSrc, setImageSrc] = useState({
    projectImageFile: null,
    projectImageSrc: "",

    bannerImageFile: null,
    bannerImageSrc: "",
  });

  const handleChange = (e) => {
    setProject((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setImageSrc((prev) => ({
      ...prev,
      [e.target.name + "File"]: e.target.files[0],
      [e.target.name + "Src"]: URL.createObjectURL(e.target.files[0]),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const image1 = await uploadFile(
      `projectsImage`,
      imageSrc.projectImageFile
    );

    const image2 = await uploadFile(
      `projectsImage`,
      imageSrc.bannerImageFile
    );

    addDoc(collection(db, "projects"), {
      ...project,
      profileImage: image1,
      bannerImage: image2,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='name'
          value={project.name}
          placeholder='Project name'
          onChange={handleChange}
        />
        <input
          type='text'
          name='description'
          value={project.description}
          placeholder='Project description'
          onChange={handleChange}
        />
        <input
          type='text'
          name='slug'
          value={project.slug}
          placeholder='Slug'
          onChange={handleChange}
        />

        <input
          type='file'
          accept='image/*'
          name='projectImage'
          onChange={handleImageChange}
        />
        {imageSrc.projectImageSrc && (
          <Image
            src={imageSrc.projectImageSrc}
            alt='Project image'
            width={200}
            height={200}
          />
        )}

        <input
          type='file'
          accept='image/*'
          name='bannerImage'
          onChange={handleImageChange}
        />
        {imageSrc.bannerImageSrc && (
          <Image
            src={imageSrc.bannerImageSrc}
            alt='Banner image'
            width={200}
            height={200}
          />
        )}

        <input
          type='text'
          name='link'
          value={project.link}
          placeholder='Official link'
          onChange={handleChange}
        />

        <input
          type='checkbox'
          name='isPrivate'
          value={project.isPrivate}
          onChange={handleChange}
        />

        <input
          type='datetime-local'
          name='mintDate'
          value={project.mintDate}
          onChange={handleChange}
        />
        <input
          type='time'
          name='mintTime'
          value={project.mintTime}
          onChange={handleChange}
        />
        <input
          type='text'
          name='mintAvailableSpots'
          value={project.mintAvailableSpots}
          placeholder='Available Spots'
          onChange={handleChange}
        />
        <input
          type='text'
          name='mintPrice'
          value={project.mintPrice}
          placeholder='Mint Price'
          onChange={handleChange}
        />

        <button>Save</button>
      </form>
    </div>
  );
};

export default ProjectInfo;
