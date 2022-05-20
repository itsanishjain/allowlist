import { getDoc, doc } from "firebase/firestore";

import { db } from "../src/utils/firebase";
import UserRegister from "../src/components/Register";

const UserRegisterPage = ({ data }) => (
  <div>
    <p className="text-xl ">Allowlist</p>
    User Register
    <UserRegister data={data} />
  </div>
);

export async function getServerSideProps(ctx) {
  let data = {};

  await getDoc(doc(db, "projects", ctx.params.id))
    .then((res) => (data = { id: res.id, ...res.data() }))
    .catch((err) => console.log(err));

  return { props: { data } };
}

export default UserRegisterPage;
