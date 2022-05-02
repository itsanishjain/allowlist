import React, { useState } from "react";
import Image from "next/image";
import { uploadFile } from "../utils/helpers";
import { addDoc, updateDoc, collection } from "firebase/firestore";
import { db, storage } from "../utils/firebase";

const ProjectInfo = ({ data }) => {
  const [project, setProject] = useState({
    // ...data
    name: data.name,
    description: data.description,
    projectImage: data.projectImage,
    bannerImage: data.bannerImage,
    // slug: "",
    // link: "",
    // isPrivate: true,
    // mintDate: "",
    // mintTime: "",
    // mintAvailableSpots: "",
    // mintPrice: "",
  });

  const [imageFiles, setImageFiles] = useState({
    projectImageFile: null,
    // projectImageSrc: "",

    bannerImageFile: null,
    // bannerImageSrc: "",
    projectFileChanged: false,
    bannerFileChanged: false,
  });

  const handleChange = (e) => {
    setProject((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFiles((prev) => ({
      ...prev,
      [e.target.name + "File"]: e.target.files[0],
      [e.target.name + "Changed"]: true,
      // [e.target.name + "Src"]: URL.createObjectURL(e.target.files[0]),
    }));

    setProject((prev) => ({
      ...prev,
      [e.target.name]: URL.createObjectURL(e.target.files[0]),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var imagesToUpload = {};

    if (imageFiles.projectFileChanged) {
      imagesToUpload["projectImage"] = await uploadFile(
        `projectsImage`,
        imageFiles.projectImageFile
      );
    }

    if (imageFiles.bannerFileChanged) {
      imagesToUpload["bannerImage"] = await uploadFile(
        `projectsImage`,
        imageFiles.bannerImageFile
      );
    }

    updateDoc(collection(db, "projects"), {
      ...project,
      // profileImage: image1,
      // bannerImage: image2,
      ...imagesToUpload,
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
        {project.projectImage && (
          <Image
            src={project.projectImage}
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
        {project.bannerImage && (
          <Image
            src={project.bannerImage}
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
