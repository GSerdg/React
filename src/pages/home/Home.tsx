import { createContext, useState } from 'react';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import { Outlet } from 'react-router-dom';
import './home.css';

interface InputObjContext {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

export const InputContext = createContext<InputObjContext | undefined>(
  undefined
);

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  if (error) {
    throw new Error('You generate some error');
  }

  function handleClickErrorBtn() {
    setError(true);
  }

  return (
    <div className="page">
      <Button title={'Error'} onHandleClick={handleClickErrorBtn} />
      <Input searchInput={isLoading} />
      <Outlet />
    </div>
  );
}
