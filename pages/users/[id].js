import { getDoc, doc } from "firebase/firestore";
import UserRegister from "../../src/components/Register";
import { db } from "../../src/utils/firebase";


export default function UserRegisterPage({ data }) {
    return (
        <div>

            User Register
            <UserRegister data={data} />

        </div>

    )
}


export async function getServerSideProps(ctx) {
    let data = {};

    await getDoc(doc(db, "projects", ctx.params.id))
        .then((response) => {
            data = { ...response.data(), id: response.id };
            console.log(data)
        })
        .catch((error) => {
            console.log(error)
        });

    return { props: { data } };
}
