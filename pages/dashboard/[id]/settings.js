import { getDoc, doc } from "firebase/firestore";

import { db } from "../../../src/utils/firebase";
import ProjectInfo from "../../../src/components/ProjectInfo";
import WalletRequirement from "../../../src/components/WalletRequirement";
import RegisterUserList from "../../../src/components/RegisterUserList";

const Settings = ({ data }) => (
  <div className='my-20'>
    <ProjectInfo data={data} />
    <hr />
    <WalletRequirement data={data} />

    <hr />

    <RegisterUserList users={data.users} />
  </div>
);

export async function getServerSideProps(ctx) {
  let data = {};

  await getDoc(doc(db, "projects", ctx.params.id))
    .then((res) => (data = { id: res.id, ...res.data() }))
    .catch((err) => console.log(err));

  return { props: { data } };
}

export default Settings;
