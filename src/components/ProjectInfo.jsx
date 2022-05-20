import React, { useState } from "react";
import { updateDoc, doc } from "firebase/firestore";

import { db } from "../utils/firebase";
import { uploadFile } from "../utils/helpers";

import Input from '../components/Input'

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
    <div className="max-w-2xl mx-auto rounded-md border-2 p-4">
      {/* <p>
        <a href={`/${project.id}`}>public url: </a>
      </p> */}
      <form className="space-y-4" onSubmit={handleSubmit}>

        {/* <input
          type="text"
          name="name"
          value={project.name}
          classNameName="p-2 bg-gray-400 ml-[150px] focus:text-white focus:bg-black w-1/4 mt-10 "
          placeholder="Project name"
          onChange={handleChange}
        /> */}

        <Input name="name" placeholder="Project name" inputTagType="smallInput" value={project.name} onChange={handleChange} />

        {/* <input
          type="text"
          name="description"
          value={project.description}
          placeholder="Project description"
          classNameName="p-2 bg-gray-400 ml-[150px] focus:text-white focus:bg-black w-1/4 mt-5"
          onChange={handleChange}
        /> */}

        <Input
          name="description"
          placeholder="Project description"
          inputTagType="largeInput"
          value={project.description}
        />


        {/* TODO: FIX UI FOR THE IMAGES */}
        <input
          type="file"
          accept="image/*"
          name="profileImage"
          onChange={handleImageChange}
          classNameName="form-control
          mt-3
          block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {project.profileImage && (
          <img
            classNameName="rounded-full mt-3"
            src={project.profileImage}
            alt="Project image"
            width={200}
            height={200}
          />
        )}

        <input
          type="file"
          accept="image/*"
          name="bannerImage"
          onChange={handleImageChange}
          classNameName="form-control ml-[150px]
          block text-sm mt-[-36px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {project.bannerImage && (
          <img
            classNameName="w-5/12 h-[250px] rounded-lg mt-3 ml-[150px]"
            src={project.bannerImage}
            alt="Banner image"
            width={200}
            height={200}
          />
        )}

        {/* END IMAGE */}

        {!loading ? (
          <button classNameName="bg-black text-white w-5/12 rounded-lg mb-10 ml-[150px] mt-[50px]">
            Save
          </button>
        ) : (
          <button className="disabled">Updating......</button>
        )}


        {/* <input
            type="text"
            name="link"
            value={project.link}
            placeholder="Official link"
            onChange={handleChange}
            classNameName="p-2 bg-gray-400 text-black focus:text-white focus:bg-black placeholder:text-white"
          /> */}

        <Input
          name="link"
          placeholder="Official link"
          inputTagType="smallInput"
          value={project.link}
          onChange={handleChange}
        />

        <div className="flex items-center">
          <input
            type="checkbox"
            name="isPrivate"
            value={project.isPrivate}
            onChange={handleChange}
            className="w-6 h-6 rounded-full"
          />
          <div className="flex flex-col ml-8">
            <span>Private</span>
            <small className="text-sm font-thin">it will not show your Project on main page of our website </small>
          </div>
        </div>


        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                // fill-rule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              // clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="date"
            name="mintDate"
            value={project.mintDate}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Select date"
          />
        </div>
        <input
          type="time"
          name="mintTime"
          value={project.mintTime}
          onChange={handleChange}
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 mt-3 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Select a date"
        />
        <label className="text-gray-700">Select a time</label>
        <input
          type="text"
          name="mintAvailableSpots"
          value={project.mintAvailableSpots}
          placeholder="Available Spots"
          onChange={handleChange}
          classNameName="p-2 bg-gray-400 focus:text-white focus:bg-black w-2/4 my-3 placeholder:text-white"
        />
        {/* <input
          type="text"
          name="mintPrice"
          value={project.mintPrice}
          placeholder="Mint Price"
          onChange={handleChange}
          classNameName="p-2 bg-gray-400 focus:text-white focus:bg-black w-2/4 mt-1 placeholder:text-white"
        /> */}

        <Input
          name="mintPrice"
          placeholder="Mint Price"
          inputTagType="smallInput"
          value={project.mintPrice}
          onChange={handleChange}
        />

      </form>
    </div>
  );
};

export default ProjectInfo;
