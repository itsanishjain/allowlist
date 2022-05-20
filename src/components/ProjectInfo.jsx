import { useState } from "react";
import Link from "next/link";
import { updateDoc, doc } from "firebase/firestore";

import { db } from "../utils/firebase";
import { uploadFile } from "../utils/helpers";
import Input from "../components/Input";
import Loader from "./Loader";

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
    <div className='flex flex-col md:grid md:grid-cols-3 max-w-6xl mx-auto'>
      <div className='my-2 md:my-0'>
        <Link href={`/${project.id}`}>
          <a className='bg-gradient-to-r from-purple-400  m-2 p-4 block text-white '>
            Public URL
          </a>
        </Link>
      </div>
      <div className='col-span-2 rounded-md border-2 p-4 '>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <Input
            name='name'
            placeholder='Project name'
            inputTagType='smallInput'
            value={project.name}
            onChange={handleChange}
            required={true}
          />

          <Input
            name='description'
            placeholder='Project description'
            inputTagType='largeInput'
            onChange={handleChange}
            value={project.description}
            required={true}
          />

          {/* TODO: FIX UI FOR THE IMAGES */}
          <input
            type='file'
            accept='image/*'
            name='profileImage'
            onChange={handleImageChange}
            className='form-control mt-3 block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'

          />
          {project.profileImage && (
            <img
              className=''
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
            className='form-control block text-sm mt-[-36px] text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
          />
          {project.bannerImage && (
            <img
              className='bg-cover bg-center'
              src={project.bannerImage}
              alt='Banner image'
              width={200}
              height={200}
            />
          )}

          {/* END IMAGE */}

          <Input
            name='link'
            placeholder='Official link'
            inputTagType='smallInput'
            value={project.link}
            onChange={handleChange}
          />

          <div className='flex items-center'>
            <input
              type='checkbox'
              name='isPrivate'
              value={project.isPrivate}
              onChange={handleChange}
              className='w-6 h-6 rounded-full'
            />
            <div className='flex flex-col ml-8'>
              <span>Private</span>
              <small className='text-sm font-thin'>
                it will not show your Project on main page of our website{" "}
              </small>
            </div>
          </div>

          <div className='grid grid-cols-3'>
            <svg
              className='w-5 h-5 text-gray-500 dark:text-gray-400 '
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                // fill-rule="evenodd"
                d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
              // clip-rule="evenodd"
              ></path>
            </svg>
            <input
              type='date'
              name='mintDate'
              value={project.mintDate}
              onChange={handleChange}
              className='col-span-2'
              placeholder='Select date'
            />
          </div>

          <input
            type='time'
            name='mintTime'
            value={project.mintTime}
            onChange={handleChange}
            className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 mt-3 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
            placeholder='Select a date'
          />
          <label className='text-gray-700'>Select a time</label>
          <input
            type='text'
            name='mintAvailableSpots'
            value={project.mintAvailableSpots}
            placeholder='Available Spots'
            onChange={handleChange}
            className='p-2 bg-gray-400 focus:text-white focus:bg-black w-2/4 my-3 placeholder:text-white'
          />

          <Input
            name='mintPrice'
            placeholder='Mint Price'
            inputTagType='smallInput'
            value={project.mintPrice}
            onChange={handleChange}
          />

          {loading ?
            <Loader />
            :
            <button>Save</button>
          }
        </form>
      </div>
    </div>
  );
};

export default ProjectInfo;
