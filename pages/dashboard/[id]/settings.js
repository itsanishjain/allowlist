import React from "react";
import { useRouter } from "next/router";
import ProjectInfo from "../../../src/components/ProjectInfo";

const Settings = () => {
  const router = useRouter();

  console.log(router.query);

  return (
    <div className='my-20'>
      <ProjectInfo />
    </div>
  );
};

export default Settings;
