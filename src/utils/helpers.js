import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";


export const truncateAddress = (address) => {
    if (!address) return "No Account";
    const match = address.match(
        /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/
    );
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
};

export const toHex = (num) => {
    const val = Number(num);
    return "0x" + val.toString(16);
};


export const uploadFile = async (path, file) => {
    const storageRef = ref(storage, `${path}/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
};
