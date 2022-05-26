import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../context/UserContext";

import Input from "../components/Input";
import toast from "react-hot-toast";

const RegisterUserList = ({ users, projectId }) => {
  const { allowlistNFT } = useContext(UserContext);





  const [winners, setWinners] = useState([]);
  const [winnersCount, setWinnersCount] = useState(1);

  const router = useRouter();



  const selectRandomWinners = () => {
    // Return the indexes of an array
    let usersIndex = [...Array(users.length).keys()];
    // Randomize the indexes
    usersIndex.sort(() => Math.random() - 0.5);
    setWinners(usersIndex.slice(0, winnersCount).map((i) => users[i]));
  };

  // CSV file
  const toCsv = () => {
    if (!allowlistNFT.isActivated) {
      toast.error("Please activate your Allowlist NFT");
      return
    }
    var csv_file, download_link;
    csv_file = new Blob([[...winners].join("\n")], { type: "text/csv" });
    download_link = document.createElement("a");
    download_link.download = `winners_${router.query.id}.csv`;
    download_link.href = window.URL.createObjectURL(csv_file);
    download_link.style.display = "none";
    document.body.appendChild(download_link);
    download_link.click();
    document.body.removeChild(download_link);
  }

  return (
    <div className='max-w-xl mx-auto space-y-4'>
      <Input
        type='number'
        inputTagType='smallInput'
        name='winnerCount'
        placeholder='winner count'
        value={winnersCount}
        onChange={(e) => setWinnersCount(e.target.value)}
      />
      <button onClick={selectRandomWinners}>Select Random Winners</button>
      {
        winners.length !== 0 && <button className="ml-4" onClick={toCsv}>Download CSV</button>
      }
      <div className='mt-8'>
        {winners.map((winner, i) => (
          <p className='text-red-500' key={i}>
            {winner}
          </p>
        ))}
      </div>
      <div className='py-4 px-1 bg-gray-100 shadow-sm rounded-md  font-mono'>
        {users?.map((user, index) => (
          <div key={index}>
            <p className='flex items-center justify-between'>
              <span className='text-sm md:text-md'>{index + 1}-</span>
              <span className='text-sm md:text-md'>{user}</span>
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default RegisterUserList;
