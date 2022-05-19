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

export const toHex = (num) => "0x" + Number(num).toString(16);

export const uploadFile = async (path, file, filename) => {
  let extension = file.name.substring(file.name.lastIndexOf("."));

  const storageRef = ref(storage, `${path}/${filename}${extension}`);

  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};
