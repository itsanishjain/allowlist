import { getDoc, doc } from "firebase/firestore";

import ProjectInfo from "../../../src/components/ProjectInfo";
import { db } from "../../../src/utils/firebase";

const Settings = ({ data }) => {
  return (
    <div className='my-20'>
      <ProjectInfo data={data} />
    </div>
  );
};

export async function getServerSideProps(ctx) {
  let data = {};

  await getDoc(doc(db, 'projects', ctx.params.id))
    .then((response) => {
      data = { ...response.data(), id: response.id }
    })
    .catch((error) => console.log(error));

  return { props: { data } }
}

export default Settings;
