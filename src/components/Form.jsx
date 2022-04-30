import { useState } from 'react'
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../utils/firebase";
import { uploadFile } from '../utils/helpers'
import { useRouter } from 'next/router';

export default function Form() {

    const router = useRouter();

    const [formValues, setFormValues] = useState({
        name: "", description: "", profileImage: "", bannerImage: ""
    });

    const [imageSrc, setImageSrc] = useState({
        profileImageSrc: null,
        bannerImageSrc: null
    })

    const onImageChange = (e) => {
        const reader = new FileReader();
        reader.onload = function (onLoadEvent) {
            setImageSrc((prevValues) => (
                { ...prevValues, [e.target.name]: onLoadEvent.target.result }
            ))

        }
        reader.readAsDataURL(e.target.files[0]);
        setFormValues((prevValues) => (
            { ...prevValues, [e.target.name]: e.target.files[0] }
        ))
    }

    const handleChange = (e) => {
        setFormValues((prevValues) => (
            { ...prevValues, [e.target.name]: e.target.value }
        ))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting......")
        console.log(formValues);
        // TODO: API to save data to firebase

        const image1 = await uploadFile(
            `projectsImage`,
            formValues.profileImage
        );

        const image2 = await uploadFile(
            `projectsImage`,
            formValues.bannerImage
        );

        try {
            const response = await addDoc(collection(db, "projects"), {
                ...formValues,
                profileImage: image1,
                bannerImage: image2,
            })
            console.log({ response })
            console.log(response.id)
            router.push(`/dashboard/${response.id}/settings`)
        }
        catch (error) {
            console.log("ERROR in submitting form", error)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name='name' onChange={handleChange} value={formValues.name} type="text" placeholder="Project Name" />
                <textarea name='description' onChange={handleChange} value={formValues.description} type="text" placeholder="Description" />

                <p>Profile Image</p>
                <input name="profileImage" onChange={onImageChange} accept='image/*' type="file" />

                <img src={imageSrc.profileImage}></img>

                <p>Banner Image</p>
                <input name="bannerImage" onChange={onImageChange} accept='image/*' type="file" />
                <img src={imageSrc.bannerImage}></img>

                <button>Create</button>
            </form>
        </div>
    )
}
