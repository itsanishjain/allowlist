import { useState } from 'react'
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../src/utils/firebase";
import ProjectInfo from "../../../src/components/ProjectInfo";
import WalletRequirement from "../../../src/components/WalletRequirement";
import RegisterUserList from "../../../src/components/RegisterUserList";


const tabClassName = {
  active: 'text-center block border border-purple-500 rounded py-2 px-4 bg-purple-500 hover:bg-purple-700 text-white',
  inactive: 'text-center text-black block rounded py-2 px-4 text-white'
}

const Tab = ({ tabName, data }) => {
  const tab = {
    projectInfo: <ProjectInfo data={data} />,
    walletRequirement: <WalletRequirement data={data} />,
    registerUserList: <RegisterUserList users={data.users} />
  }

  return (
    <>{tab[tabName]}</>
  )
}

const Settings = ({ data }) => {
  const [activeTab, setActiveTab] = useState('projectInfo')

  return (
    <>
      <ul className="flex mb-8 max-w-3xl mx-auto ">
        <li onClick={() => setActiveTab('projectInfo')} className="flex-1 mr-2  cursor-pointer">
          <a className={activeTab === 'projectInfo' ? tabClassName.active : tabClassName.inactive} >Project Info</a>
        </li>
        <li onClick={() => setActiveTab('walletRequirement')} className="flex-1 mr-2  cursor-pointer">
          <a className={activeTab === 'walletRequirement' ? tabClassName.active : tabClassName.inactive}   >Wallet Requirements</a>
        </li>
        <li onClick={() => setActiveTab('registerUserList')} className="flex-1 mr-2 cursor-pointer">
          <a className={activeTab === 'registerUserList' ? tabClassName.active : tabClassName.inactive} >Register User</a>
        </li>
      </ul>
      <Tab tabName={activeTab} data={data} />
    </>
  )
}

export async function getServerSideProps(ctx) {
  let data = {};

  await getDoc(doc(db, "projects", ctx.params.id))
    .then((res) => (data = { id: res.id, ...res.data() }))
    .catch((err) => console.log(err));

  return { props: { data } };
}

export default Settings;
