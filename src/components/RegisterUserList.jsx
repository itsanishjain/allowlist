import { useState } from "react";
import Input from "../components/Input";

const RegisterUserList = ({ users }) => {
  const [winners, setWinners] = useState([]);
  const [winnersCount, setWinnersCount] = useState(1);

  const selectRandomWinners = () => {
    let randomNumbers = [...Array(users.length).keys()];
    randomNumbers.sort(() => Math.random() - 0.5);
    setWinners(randomNumbers.slice(0, winnersCount).map((i) => users[i]));
  };

  return (
    <div className='max-w-xl mx-auto'>
      <Input
        type='number'
        inputTagType='smallInput'
        name='winnerCount'
        placeholder='winner count'
        value={winnersCount}
        onChange={(e) => setWinnersCount(e.target.value)}
      />
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
      <div className='mt-8'>
        {winners.map((winner, i) => (
          <p className='text-red-500' key={i}>
            {winner}
          </p>
        ))}
      </div>
    </div>
  );
};

export default RegisterUserList;
