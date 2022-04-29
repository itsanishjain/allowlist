import { useState } from 'react'

export default function Form() {

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
