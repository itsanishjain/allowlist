import React, { useState } from "react";
import Image from "next/image";
import { updateDoc, doc } from "firebase/firestore";

import { db } from "../utils/firebase";
import { uploadFile } from "../utils/helpers";

const ProjectInfo = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [isProjectInfoUpdated, setIsProjectInfoUpdated] = useState(false);

  const [project, setProject] = useState(data);

  const [imageFiles, setImageFiles] = useState({
    profileImageFile: null,
    bannerImageFile: null,

    profileImageFileChanged: false,
    bannerImageFileChanged: false,
  });

  const handleChange = (e) => {
    setIsProjectInfoUpdated(true);
    setProject((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setIsProjectInfoUpdated(true);
    setImageFiles((prev) => ({
      ...prev,
      [e.target.name + "File"]: e.target.files[0],
      [e.target.name + "FileChanged"]: true,
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

    let imagesToUpload = {};

    if (imageFiles.profileImageFileChanged) {
      imagesToUpload["profileImage"] = await uploadFile(
        `projects/${data.id}`,
        imageFiles.profileImageFile,
        "profileImage"
      );
    }

    if (imageFiles.bannerImageFileChanged) {
      imagesToUpload["bannerImage"] = await uploadFile(
        `projects/${data.id}`,
        imageFiles.bannerImageFile,
        "bannerImage"
      );
    }

    const updatedProject = {
      ...project,
      ...imagesToUpload,
    };

    await updateDoc(doc(db, "projects", data.id), updatedProject)
      .then(() => setProject(updatedProject))
      .catch((err) => console.log(err));

    setLoading(false);
  };

  return (
    <div>
      <p>
        <a href={`/users/${project.id}`}>public url: </a>
      </p>
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

        {!loading ? <button>Save</button> : "Updating..........."}
      </form>
    </div>
  );
};

export default ProjectInfo;
