import React, { useState } from "react";
import Image from "next/image";
import { uploadFile } from "../utils/helpers";
import { addDoc, updateDoc, collection, doc } from "firebase/firestore";
import { db, storage } from "../utils/firebase";

const ProjectInfo = ({ data }) => {


  const [loading, setLoading] = useState(false);
  const [isProjectInfoUpdated, setIsProjectInfoUpdated] = useState(false);

  const [project, setProject] = useState({
    // name: data.name,
    // description: data.description,
    // profileImage: data.profileImage,
    // bannerImage: data.bannerImage,
    // link: data.link,
    // isPrivate: data.isPrivate,
    // mintDate: data.mintDate,
    // mintTime: data.mintTime,
    // mintAvailableSpots: data.mintAvailableSpots,
    // mintPrice: data.mintPrice,
    ...data
  });

  const [imageFiles, setImageFiles] = useState({
    profileImageFile: null,
    bannerImageFile: null,

    projectFileChanged: false,
    bannerFileChanged: false,
  });

  const handleChange = (e) => {
    setIsProjectInfoUpdated(true)
    setProject((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setIsProjectInfoUpdated(true)
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

    if (!isProjectInfoUpdated) return;
    setLoading(true);
    var imagesToUpload = {};



    if (imageFiles.projectFileChanged) {
      imagesToUpload["profileImage"] = await uploadFile(
        `projectsImage`,
        imageFiles.profileImageFile
      );
    }

    if (imageFiles.bannerFileChanged) {
      imagesToUpload["bannerImage"] = await uploadFile(
        `projectsImage`,
        imageFiles.bannerImageFile
      );
    }

    await updateDoc(doc(db, "projects", data.id), {
      ...project,
      // profileImage: image1,
      // bannerImage: image2,

      ...imagesToUpload,
    })
      .then((res) => {
        console.log(res)

      })
      .catch((err) => console.log(err));
    setLoading(false)
  };

  return (
    <div>

      <p><a href={`/users/${data.id}`} >public url: </a></p>
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
          type='file'
          accept='image/*'
          name='profileImage'
          onChange={handleImageChange}
        />
        {project.profileImage && (
          <Image
            src={project.profileImage}
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
          type='date'
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

        {
          !loading ? <button>Save</button> : "Updating..........."
        }
      </form>
    </div>
  );
};

export default ProjectInfo;
