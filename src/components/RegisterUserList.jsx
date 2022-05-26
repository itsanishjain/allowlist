import { useState } from "react";
import toast from "react-hot-toast";
import Input from '../components/Input'

const RegisterUserList = ({ users }) => {
  const [winners, setWinners] = useState([]);
  const [winnersCount, setWinnersCount] = useState(1);

  const selectRandomWinners = () => {
    if (winnersCount > users.length) {
      toast.error('Exceed')
      return;
    }
    if (winnersCount === users.length) {
      setWinners(users);
      return;
    }
    let tempWinners = []
    while (true) {
      const randomNumber = Math.floor(Math.random() * users.length)
      if (!tempWinners.includes(randomNumber)) {
        tempWinners.push(randomNumber)
      }
      if (tempWinners.length === winnersCount) break;
    }
    setWinners(tempWinners.map((w) => users[w]));
  }


  console.log(winners);

  return (
    <div className='max-w-xl mx-auto'>
      <Input type="number" inputTagType="smallInput" name="winnerCount" placeholder="winner count" value={winnersCount} onChange={(e) => setWinnersCount(e.target.value)} />
      <button onClick={selectRandomWinners}>Select Random Winners</button>
      <button>Download CSV</button>
      <div className='bg-gray-100 shadow-sm p-8 rounded-md space-y-4 font-mono'>
        {users?.map((user, index) => (
          <div key={index}>
            <p className='flex items-center justify-between'>
              <span className='text-md'>{index + 1}.</span>
              <span className='text-md'>{user}</span>
            </p>
          </div>
        ))}
      </div>
      <div className="mt-8">
        {
          winners.map((winner, index) => (
            <p key={index}>{users[winner]}</p>
          ))
        }
      </div>
    </div>
  )
};

export default RegisterUserList;
