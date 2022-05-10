import { providers } from "ethers";
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

export const uploadFile = async (path, file) => {
  const storageRef = ref(storage, `${path}/${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

const isContractExistOnChain = async (contractAddress) => {
  const provider = await library.provider;
  const web3Provider = new providers.Web3Provider(provider);
  const code = await web3Provider.getCode(contractAddress);

  return code !== "0x";
};

const checkWalletBalance = async () => {
  const provider = await library.provider;
  const web3Provider = new providers.Web3Provider(provider);
  let balance = await web3Provider.getBalance(account);
  return balance;
};
